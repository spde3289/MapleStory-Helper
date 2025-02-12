// import HeadMeta from '@/commonComponents/HeadMeta'
import CharacterCreator from './components/CharacterCreator'

function Home() {
  return (
    <main className="h-full flex-1 p-3 flex items-center justify-center">
      <div>
        <CharacterCreator />
      </div>
    </main>
  )
}

export default Home
