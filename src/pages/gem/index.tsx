/* eslint-disable react-hooks/exhaustive-deps */
import CharacterSection from '@/components/gem/CharacterSection'
import GemSection from '@/components/gem/GemSection'

const GemPage = () => {
  return (
    <main className="flex items-center justify-evenly w-full h-full">
      <CharacterSection />
      <GemSection />
    </main>
  )
}

export default GemPage
