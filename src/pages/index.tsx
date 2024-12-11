import CharacterCreator from '@/components/CharacterCreator'
import Head from 'next/head'

const Home = () => {
  return (
    <main className="h-full flex-1 flex items-center justify-center">
      <Head>
        <meta
          name="google-site-verification"
          content="izZuJGlIKcip19ks9NDEGRDBq8naOCnZHtH4vA034I4"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>메이플 헬퍼</title>
      </Head>
      <div>
        <CharacterCreator />
      </div>
    </main>
  )
}

export default Home
