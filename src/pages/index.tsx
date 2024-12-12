import HeadMeta from '@/commonComponents/HeadMeta'
import CharacterCreator from '@/components/CharacterCreator'

const Home = () => {
  return (
    <main className="h-full flex-1 flex items-center justify-center">
      <HeadMeta />
      <div>
        <CharacterCreator />
      </div>
    </main>
  )
}

export default Home
