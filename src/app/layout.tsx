import AppHeader from '@/components/layout/AppHeader'
import Backdrop from '@/components/layout/Backdrop'
import NavBar from '@/components/layout/NavBar'
import DataFetchProvider from '@/components/porvider/DataFetchProvider'
import DesigeProvider from '@/components/porvider/DesigeProvider'
import GlobalStateProvider from '@/components/porvider/GlobalStateProvider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

// 폰트 파일 경로를 /public/fonts 에서 가져옴
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
  variable: '--font-Maplestory',
})

export const metadata: Metadata = {
  title: '메이플 헬퍼',
  description:
    '메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다. 주간보스 결정석, 해방 일정 계산등 여러 기능들을 편리하게 이용할 수 있습니다.',
  keywords:
    '메이플스토리, 메이플스토리 헬퍼, 메이플 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색, 해방 퀘스트, 제네시스 무기, 해방퀘스트, 메이플계산기',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${mapleFont.className} antialiased dark:bg-gray-900 dark:text-white/90`}
      >
        <Analytics />
        {/* Google Analytics Script */}
        {GOOGLE_ANALYTICS && <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />}
        <GlobalStateProvider>
          <DataFetchProvider>
            <DesigeProvider>
              <main className="">
                <AppHeader />
                <NavBar />
                <Backdrop />
                <div className="h-[calc(100vh-65px)] lg:pl-[290px] ">
                  <main className="h-full p-1 overflow-scroll scrollBar sm:p-4 md:p-5 flex flex-col lg:flex-row gap-2 sm:gap-5">
                    {children}
                  </main>
                </div>
              </main>
            </DesigeProvider>
          </DataFetchProvider>
        </GlobalStateProvider>
      </body>
    </html>
  )
}
