// import Layout from '@/components/Layout'
import MainCharacterProvider from '@/context/characterContext'
import CharacterInfoListProvider from '@/context/characterInfoListContext'
import GoogleAnalytics from '@/lib/GoogleAnalytics'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'

// 폰트 파일 경로를 /public/fonts 에서 가져옴
const myFont = localFont({
  src: [
    {
      path: './fonts/Maplestory-light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Maplestory-bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-Maplestory',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${myFont.className}`}>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <Analytics />
      <CharacterInfoListProvider>
        <MainCharacterProvider>
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </MainCharacterProvider>
      </CharacterInfoListProvider>
    </div>
  )
}

export default App
