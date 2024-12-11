import BossSection from '@/components/Gem/BossSection'
import CharacterSection from '@/components/Gem/CharacterSection'
import GemSection from '@/components/Gem/GemSection'
import Head from 'next/head'
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
    <main className="flex xs:flex-col w-full h-full p-3 xs:pt-12 lg:pl-12 gap-3 box-border overflow-x-auto scrollBar">
      <Head>
        <title>보스결정석 - 메이플 헬퍼</title>
      </Head>
      <CharacterSection />
      <div className="flex flex-col gap-3 xs:flex-col-reverse mb-5">
        <GemSection unit={unit} unitHandler={unitHandler} />
        <BossSection unit={unit} />
      </div>
    </main>
  )
}

export default GemPage
