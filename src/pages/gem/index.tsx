import { useMainCharacterContext } from '@/context/characterContext'

const GemPage = () => {
  const { mainCharacter } = useMainCharacterContext()
  console.log(mainCharacter)
  return (
    <main className="flex items-center justify-evenly w-full h-full">
      <section className="bg-white">캐릭터 추가</section>
      <section className="bg-white">결졍석 판매 가격</section>
    </main>
  )
}

export default GemPage
