import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZAU Framework | Modern Python-First Fullstack & Native 3D Spatial Canvas',
  description:
    'ZetaGo-Aurum Unified Fullstack Web Framework (ZAU) - Modern ASGI Engine, Native 3D Spatial Canvas with model/3d/ pipeline, Asynchronous ORM, and Dual Tailwind + Bootstrap Styling.',
  authors: [{ name: 'ZetaGo-Aurum', url: 'https://zetagoaurum.com' }],
  keywords: [
    'ZAU Framework',
    'Python Fullstack',
    '3D Web Framework',
    'Three.js',
    'Tailwind CSS',
    'Bootstrap Icons',
    'ASGI',
    'ZetaGo-Aurum',
    'Next.js Chunks',
  ],
  openGraph: {
    title: 'ZAU Framework | Modern Python-First Fullstack & Native 3D Spatial Canvas',
    description:
      'Industrial-grade Python-first web framework with native 3D spatial canvas, async ORM, and modern client chunking.',
    url: 'https://zau-framework.vercel.app',
    siteName: 'ZAU Framework',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%2309090b"/><text x="50%" y="68%" font-size="56" font-weight="900" fill="%23f59e0b" text-anchor="middle" font-family="sans-serif">Z</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
