import NavBar from '@/components/layout/NavBar'
import DataFetchProvider from '@/components/porvider/DataFetchProvider'
import MainCharacterProvider from '@/context/characterContext'
import CharacterInfoListProvider from '@/context/characterInfoListContext'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

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
      <body className={`${mapleFont.className} antialiased`}>
        {/* Google Analytics Script */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css"
          rel="stylesheet"
        />
        <CharacterInfoListProvider>
          <MainCharacterProvider>
            <DataFetchProvider>
              <main className="flex h-screen flex-col lg:flex-row no-drag overflow-hidden">
                <NavBar />
                <section className="bg-gray-200 lg:w-full lg:h-screen xs:w-full xs:h-full overflow-x-auto">
                  {children}
                </section>
              </main>
            </DataFetchProvider>
          </MainCharacterProvider>
        </CharacterInfoListProvider>
      </body>
    </html>
  )
}
