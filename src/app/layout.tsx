import RootFooter from '@/components/layout/rootFooter/RootFooter'
import RootHeader from '@/components/layout/rootHeader/RootHeader'
import { ThemeProvider } from '@/context/ThemeContext'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

const mapleFont = localFont({
  src: [
    {
      path: '../assets/fonts/Maplestory-light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Maplestory-bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-maplestory',
})

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.ttf',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '메이플 헬퍼',
  description:
    '메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다. 주간보스 결정석, 해방 일정 계산등 여러 기능들을 편리하게 이용할 수 있습니다.',
  keywords:
    '메이플스토리, 메이플스토리 헬퍼, 메이플 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색, 해방 퀘스트, 제네시스 무기, 해방퀘스트, 메이플계산기',
  other: {
    'google-adsense-account': 'ca-pub-1891953654573817',
  },
}

const ScriptTag = () => {
  const codeToRunOnClient = `(() => {
  try {
    const storedTheme = localStorage.getItem('theme'); // 'light' | 'dark' | 'system' | null

    const theme =
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'system'
        ? storedTheme
        : 'system';

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const resolvedTheme =
      theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    // localStorage 접근 실패 등 예외 상황 대비
  }
})();
`

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${mapleFont.variable} min-w-96 w-full antialiased dark:bg-neutral-900 dark:text-white/90 font-sans`}
      >
        {/* Vercel Analytics Script */}
        <Analytics />
        {/* Google Analytics Script */}
        {GOOGLE_ANALYTICS && <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />}
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1891953654573817"
          crossOrigin="anonymous"
        ></Script>
        <ScriptTag />
        <ThemeProvider>
          <RootHeader />
          <main className="min-w-96 w-full lg:w-[800px] xl:w-[1024px] my-0 mx-auto min-h-[calc(100vh-309px)]">
            {children}
          </main>
          <RootFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
