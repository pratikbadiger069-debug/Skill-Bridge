-- ZERO × SkillBridge Production PostgreSQL DDL Architecture
-- Enterprise-grade, scalable for 100,000+ active users & high-throughput telemetry

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- ------------------------------------------------------
-- 1. CORE TABLES & SECURITY
-- ------------------------------------------------------

CREATE TYPE user_account_status AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION');
CREATE TYPE user_role_code AS ENUM ('STUDENT', 'FACULTY', 'RECRUITER', 'ADMIN', 'INSTITUTE_DEAN');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    account_status user_account_status DEFAULT 'ACTIVE' NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    department VARCHAR(100),
    institution_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code user_role_code UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE authentications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (provider, provider_id)
);

-- ------------------------------------------------------
-- 2. STUDENT & BUILDER SCORE TABLES
-- ------------------------------------------------------

CREATE TABLE builder_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(50),
    semester VARCHAR(20),
    graduation_year INT,
    skills_jsonb JSONB DEFAULT '[]'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE builder_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_score INT DEFAULT 0 NOT NULL CHECK (overall_score >= 0 AND overall_score <= 1000),
    assessments_score INT DEFAULT 0 NOT NULL CHECK (assessments_score >= 0 AND assessments_score <= 300),
    projects_score INT DEFAULT 0 NOT NULL CHECK (projects_score >= 0 AND projects_score <= 250),
    github_score INT DEFAULT 0 NOT NULL CHECK (github_score >= 0 AND github_score <= 150),
    challenges_score INT DEFAULT 0 NOT NULL CHECK (challenges_score >= 0 AND challenges_score <= 100),
    communication_score INT DEFAULT 0 NOT NULL CHECK (communication_score >= 0 AND communication_score <= 100),
    consistency_score INT DEFAULT 0 NOT NULL CHECK (consistency_score >= 0 AND consistency_score <= 100),
    current_level INT DEFAULT 1 NOT NULL CHECK (current_level >= 1 AND current_level <= 7),
    level_title VARCHAR(100) DEFAULT 'Novice Builder' NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    xp_value INT NOT NULL
);

CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (user_id, achievement_id)
);

CREATE TABLE builder_levels (
    level_number INT PRIMARY KEY CHECK (level_number >= 1 AND level_number <= 7),
    title VARCHAR(100) NOT NULL,
    min_score INT NOT NULL,
    max_score INT NOT NULL,
    min_xp INT NOT NULL
);

CREATE TABLE journey_histories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone_name VARCHAR(255) NOT NULL,
    milestone_type VARCHAR(100) NOT NULL,
    points_earned INT DEFAULT 0 NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ------------------------------------------------------
-- 3. ASSESSMENT TABLES
-- ------------------------------------------------------

CREATE TYPE difficulty_tier AS ENUM ('EASY', 'MEDIUM', 'ADVANCED', 'EXPERT');

CREATE TABLE question_pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id UUID NOT NULL REFERENCES question_pools(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    difficulty difficulty_tier DEFAULT 'MEDIUM' NOT NULL,
    type VARCHAR(50) NOT NULL,
    options_jsonb JSONB NOT NULL,
    correct_answer_jsonb JSONB NOT NULL,
    xp_reward INT DEFAULT 25 NOT NULL
);

CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty difficulty_tier DEFAULT 'MEDIUM' NOT NULL,
    duration_minutes INT DEFAULT 30 NOT NULL,
    total_questions INT DEFAULT 20 NOT NULL,
    passing_percentage INT DEFAULT 70 NOT NULL,
    certification_eligible BOOLEAN DEFAULT TRUE NOT NULL,
    max_attempts INT DEFAULT 3 NOT NULL
);

CREATE TABLE assessment_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'in_progress' NOT NULL,
    score_percentage NUMERIC(5, 2),
    passed BOOLEAN,
    confidence_score NUMERIC(5, 2),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_answer_jsonb JSONB NOT NULL,
    is_correct BOOLEAN NOT NULL,
    points_awarded INT NOT NULL
);

CREATE TABLE skill_confidences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    confidence_pct INT NOT NULL CHECK (confidence_pct >= 0 AND confidence_pct <= 100),
    last_assessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (user_id, skill_name)
);

-- ------------------------------------------------------
-- 4. PROJECT TABLES
-- ------------------------------------------------------

CREATE TYPE project_status AS ENUM ('DRAFT', 'IN_PROGRESS', 'VERIFIED', 'FEATURED', 'ARCHIVED');

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tech_stack TEXT[] NOT NULL,
    github_repo_url TEXT,
    demo_url TEXT,
    status project_status DEFAULT 'IN_PROGRESS' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_in_project VARCHAR(100) NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (project_id, user_id)
);

CREATE TABLE project_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    completion_pct INT DEFAULT 0 NOT NULL
);

CREATE TABLE project_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewer_role VARCHAR(50) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    feedback_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE project_scores (
    project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
    complexity_score INT DEFAULT 0 NOT NULL,
    documentation_score INT DEFAULT 0 NOT NULL,
    code_quality_score INT DEFAULT 0 NOT NULL,
    deployment_score INT DEFAULT 0 NOT NULL,
    impact_score INT DEFAULT 0 NOT NULL,
    overall_score INT DEFAULT 0 NOT NULL
);

CREATE TABLE project_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES users(id),
    verification_hash VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'verified' NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ------------------------------------------------------
-- 5. GITHUB TABLES
-- ------------------------------------------------------

CREATE TABLE github_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    github_username VARCHAR(100) UNIQUE NOT NULL,
    public_repos_count INT DEFAULT 0 NOT NULL,
    total_stars INT DEFAULT 0 NOT NULL,
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE repositories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    github_account_id UUID NOT NULL REFERENCES github_accounts(id) ON DELETE CASCADE,
    repo_name VARCHAR(255) NOT NULL,
    repo_url TEXT NOT NULL,
    is_fork BOOLEAN DEFAULT FALSE NOT NULL,
    stars_count INT DEFAULT 0 NOT NULL,
    forks_count INT DEFAULT 0 NOT NULL,
    language_breakdown_jsonb JSONB NOT NULL
);

CREATE TABLE commits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    commit_hash VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    committed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    additions INT DEFAULT 0 NOT NULL,
    deletions INT DEFAULT 0 NOT NULL,
    is_spam_flagged BOOLEAN DEFAULT FALSE NOT NULL
);

-- ------------------------------------------------------
-- 6. COMMUNITY TABLES
-- ------------------------------------------------------

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    post_type VARCHAR(50) DEFAULT 'project_update' NOT NULL,
    appreciations_count INT DEFAULT 0 NOT NULL,
    comments_count INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    appreciations_count INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ------------------------------------------------------
-- 7. HIGH-PERFORMANCE INDEXES FOR 100,000+ USERS
-- ------------------------------------------------------

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(account_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_builder_scores_ranking ON builder_scores(overall_score DESC);
CREATE INDEX idx_commits_repo_time ON commits(repository_id, committed_at DESC);
CREATE INDEX idx_assessment_attempts_user ON assessment_attempts(user_id, assessment_id);
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_type_time ON posts(post_type, created_at DESC) WHERE deleted_at IS NULL;

-- ------------------------------------------------------
-- 8. AUTOMATED TRIGGER FOR UPDATED_AT
-- ------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
