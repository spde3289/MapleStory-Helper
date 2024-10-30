import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import MainCharacterProvider from '@/context/characterContext'

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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${myFont.className} flex`}>
      <MainCharacterProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MainCharacterProvider>
    </div>
  )
}

export default App
