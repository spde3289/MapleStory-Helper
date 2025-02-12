'use client'

import { useState } from 'react'
import BossSection from './components/BossSection'
import CharacterSection from './components/CharacterSection'
import GemSection from './components/GemSection'

type UnitType = '일반' | '유닛'

function GemPage() {
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
      <CharacterSection />
      <div className="flex flex-col gap-3 xs:flex-col-reverse mb-5">
        <GemSection unit={unit} unitHandler={unitHandler} />
        <BossSection unit={unit} />
      </div>
    </main>
  )
}

export default GemPage
