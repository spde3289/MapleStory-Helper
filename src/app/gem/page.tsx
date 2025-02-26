'use client'

import { useState } from 'react'
import BossSection from './components/BossSection'
import CharacterSection from './components/CharacterSection'
import GemSection from './components/GemSection'

type UnitType = '일반' | '유닛'

function GemPage() {
  const [unit, setUnit] = useState<UnitType>('일반')

  const unitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.innerText === '일반') {
      setUnit('유닛')
    }
    if (e.currentTarget.innerText === '유닛') {
      setUnit('일반')
    }
  }

  return (
    <>
      <CharacterSection />
      <BossSection unit={unit} />
      <GemSection unit={unit} unitHandler={unitHandler} />
      <div className="flex flex-col gap-3 xs:flex-col-reverse mb-5" />
    </>
  )
}

export default GemPage
