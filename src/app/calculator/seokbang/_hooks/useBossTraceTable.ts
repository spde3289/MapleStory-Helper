'use client'

import { useState, type ChangeEvent } from 'react'
import type { BossRow } from '../_utils/mapper'

type UseBossTraceTableArgs = BossRow[]

const useBossTraceTable = (initial: UseBossTraceTableArgs) => {
  const [tableData, setTableData] = useState<BossRow[]>(initial)

  const setDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    const bossId = e.currentTarget.dataset.bossId!
    const difficultyId = e.currentTarget.dataset.difficultyId!
    const checked = e.currentTarget.checked

    setTableData((pre) =>
      pre.map((item) => {
        if (item.name.name !== bossId) return item

        return {
          ...item,
          type: item.type.map((t) => ({
            ...t,
            current: t.difficulty === difficultyId ? checked : false,
          })),
        }
      }),
    )
  }

  const setPlayer = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const bossId = e.currentTarget.dataset.bossId!

    setTableData((pre) =>
      pre.map((item) => {
        if (item.name.name !== bossId) return item

        return {
          ...item,
          player: { ...item.player, current: Number(value) },
        }
      }),
    )
  }

  return {
    tableData,
    setDifficulty,
    setPlayer,
  }
}

export default useBossTraceTable
