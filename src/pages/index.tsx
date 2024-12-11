import CharacterCreator from '@/components/CharacterCreator'
import Head from 'next/head'

const Home = () => {
  return (
    <main className="h-full flex-1 flex items-center justify-center">
      <Head>
        <title>메이플 헬퍼</title>
      </Head>
      <div>
        <CharacterCreator />
      </div>
    </main>
  )
}

export default Home
