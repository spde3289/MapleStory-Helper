import HeadMeta from '@/commonComponents/HeadMeta'
import BossSection from '@/components/Gem/BossSection'
import CharacterSection from '@/components/Gem/CharacterSection'
import GemSection from '@/components/Gem/GemSection'
import { useState } from 'react'

type UnitType = '일반' | '유닛'

const GemPage = () => {
  const [unit, setUnit] = useState<UnitType>('일반')

  const unitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.value === '일반') {
      setUnit('유닛')
    }
    if (e.currentTarget.value === '유닛') {
      setUnit('일반')
    }
  }

  return (
    <main className="flex xs:flex-col  w-full p-3 h-full xs:pt-12 lg:pl-12 gap-3 box-border overflow-x-auto scrollBar ">
      <HeadMeta
        title="보스결정석 - 메이플 헬퍼"
        description="편리하게 스데돌이부터 노칼돌이까지 API KEY입력으로 보스 결정석 수익을 확인해 보세요."
        Keywords="주보돌이, 주간보스 결정석, 스데돌이, 스데, 하스데, 이루시, 하스데, 돌이, 검밑솔, 결정석, 주간수익, 보스 수익, 결정석 수익, 노칼, 전투력"
      />
      <CharacterSection />
      <div className="flex flex-col gap-3 xs:flex-col-reverse mb-5">
        <GemSection unit={unit} unitHandler={unitHandler} />
        <BossSection unit={unit} />
      </div>
    </main>
  )
}

export default GemPage
