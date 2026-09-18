import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'ZERO × SkillBridge | Production Builder Ecosystem',
  description:
    'ZERO × SkillBridge is a production-grade SaaS platform combining Student Growth, Smart Classrooms, Project Building, Skill Verification, Career Development, Communities, and Opportunity Matching.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Satoshi font for Headings (500, 600, 700) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Inter font for Body (500, 600, 700) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F6F4EE] text-[#1B1B1B] font-body selection:bg-[#C76A2A]/15 selection:text-[#C76A2A]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}


