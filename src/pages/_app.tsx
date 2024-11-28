import Layout from '@/components/Layout'
import MainCharacterProvider from '@/context/characterContext'
import CharacterInfoListProvider from '@/context/characterInfoListContext'
import '@/styles/globals.css'
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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${myFont.className} flex no-drag overflow-hidden`}>
      <CharacterInfoListProvider>
        <MainCharacterProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MainCharacterProvider>
      </CharacterInfoListProvider>
    </div>
  )
}

export default App
