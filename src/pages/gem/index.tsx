/* eslint-disable react-hooks/exhaustive-deps */
import CharacterSection from '@/components/Gem/CharacterSection'
import GemSection from '@/components/Gem/GemSection'

const GemPage = () => {
  return (
    <main className="flex items-center justify-evenly w-full h-full">
      <CharacterSection />
      <GemSection />
    </main>
  )
}

export default GemPage
