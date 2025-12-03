'use client'

import { useState } from 'react'
import BossSection from './_components/bossSection/BossSection'
import CharacterSection from './_components/characterSection/CharacterSection'
import GemSection from './_components/GemSection'

type UnitType = '일반' | '유닛'

function GemPage() {
  const [unit, setUnit] = useState<UnitType>('일반')
  // const [currentValue, setCurrentValue] = useState(false)

  const unitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.innerText === '일반') {
      setUnit('유닛')
    }
    if (e.currentTarget.innerText === '유닛') {
      setUnit('일반')
    }
  }

  // const handlerCurrentValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCurrentValue(e.currentTarget.checked)
  // }

  return (
    <>
      <CharacterSection
        // currentValue={currentValue}
        // handlerCurrentValue={handlerCurrentValue}
        unit={unit}
      />
      <BossSection
        // currentValue={currentValue}
        unit={unit}
      />
      <GemSection unit={unit} unitHandler={unitHandler} />
    </>
  )
}

export default GemPage
