import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth-security';
import { fetchRealGitHubData } from '@/lib/github-api';
import { analyzeGitHubSkills } from '@/lib/github-skill-engine';
import { dbService } from '@/lib/server-db';

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const body = await req.json().catch(() => ({}));
    
    const email = session?.email || body.email || 'manutej.reddy@skillbridge.edu';
    const profile = dbService.getStudentProfile(email);

    const githubUrl = profile?.professional?.githubUrl || 'https://github.com/manutejreddy';
    const username = body.username || githubUrl.replace('https://github.com/', '').replace('/', '') || 'manutejreddy';

    // 1. Fetch real GitHub REST API data
    const apiResult = await fetchRealGitHubData(username, body.accessToken);

    if (!apiResult.success) {
      return NextResponse.json({
        success: false,
        error: apiResult.error,
        errorCode: apiResult.errorCode,
        rateLimitRemaining: apiResult.rateLimitRemaining,
      }, { status: apiResult.errorCode === 'RATE_LIMITED' ? 429 : 400 });
    }

    const { user, repos = [], events = [], languages = [], totalStars = 0, totalForks = 0 } = apiResult;

    // 2. Execute Skill Detection Engine & 15% Builder Score Calculation
    const { detectedSkills, impact, insights } = analyzeGitHubSkills(repos, events);

    // 3. Update Student Profile in persistent DB
    const updatedProfile = dbService.updateStudentProfile(email, {
      professional: {
        ...profile.professional,
        githubUrl: `https://github.com/${user?.login || username}`,
        totalProjects: repos.length,
        openSourceContributions: events.length * 5,
        githubScore: impact.scorePoints * 6.5,
      },
      builderScores: {
        ...profile.builderScores,
        execution: Math.min(100, profile.builderScores.execution + 5),
        consistency: Math.min(100, Math.max(70, insights.longestStreakDays * 2)),
        overall: Math.min(1000, profile.builderScores.overall + impact.scorePoints),
      },
    });

    const lastSyncTime = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'GitHub intelligence synced successfully.',
      lastSyncTime,
      githubData: {
        connected: true,
        username: user?.login || username,
        avatarUrl: user?.avatar_url || profile.avatar,
        bio: user?.bio || profile.professional.bio,
        publicRepos: repos.length,
        followers: user?.followers || 0,
        following: user?.following || 0,
        totalStars,
        totalForks,
        languages,
        detectedSkills,
        impact,
        insights,
        pinnedRepos: repos.slice(0, 4).map((r) => ({
          name: r.name,
          description: r.description || 'Public repository',
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language || 'Code',
          url: r.html_url,
          topics: r.topics || [],
        })),
      },
      profile: updatedProfile,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'GitHub sync failed' }, { status: 500 });
  }
}
