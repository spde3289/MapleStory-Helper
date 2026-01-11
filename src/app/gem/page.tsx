'use client'

import clsx from 'clsx'
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

  return (
    <div className="py-8 px-2 m-0 md:my-0 md:m-auto lg:px-0 flex flex-col gap-4 ">
      <CrystalSalePriceSection unit={unit} unitHandler={unitHandler} />
      <div
        className={clsx('flex gap-2 flex-col justify-between', 'lg:flex-row')}
      >
        <CharacterListSection unit={unit} />
        <BossListSection unit={unit} />
      </div>
    </div>
  )
}

export default GemPage
