import BossSection from '@/components/gem/BossSection'
import CharacterSection from '@/components/gem/CharacterSection'
import GemSection from '@/components/gem/GemSection'

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
