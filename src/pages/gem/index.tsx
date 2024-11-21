import BossSection from '@/components/Gem/BossSection'
import CharacterSection from '@/components/Gem/CharacterSection'
import GemSection from '@/components/Gem/GemSection'

const GemPage = () => {
  return (
    <main className="flex w-full h-full p-3 pl-12 gap-3 overflow-y-scroll">
      <CharacterSection />
      <div className="flex flex-col gap-3">
        <GemSection />
        <BossSection />
      </div>
    </main>
  )
}

export default GemPage
