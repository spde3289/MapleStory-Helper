'use client'

import { useState } from 'react'
import BossListSection from './_components/bossListSection/BossListSection'
import CharacterListSection from './_components/characterListSection/CharacterListSection'
import CrystalSalePriceSection from './_components/crystalSalePriceSection/CrystalSalePriceSection'

type UnitType = '일반' | '유닛'

const GemPage = () => {
  const [unit, setUnit] = useState<UnitType>('일반')

  const unitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.innerText === '일반') {
      setUnit('유닛')
    }
    if (e.currentTarget.innerText === '유닛') {
      setUnit('일반')
    }
  }
  // console.log(unitHandler)
  return (
    <>
      <CharacterListSection unit={unit} />
      <BossListSection unit={unit} />
      <CrystalSalePriceSection unit={unit} unitHandler={unitHandler} />
    </>
  )
}

export default GemPage
