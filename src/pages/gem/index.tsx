/* eslint-disable react-hooks/exhaustive-deps */
import CharacterSection from '@/components/gem/CharacterSection'
import GemSection from '@/components/gem/GemSection'

const GemPage = () => {
  return (
    <main className="flex w-full h-full p-3 pl-12 gap-3 overflow-y-scroll">
      <CharacterSection />
      <GemSection />
    </main>
  )
}

export default GemPage
