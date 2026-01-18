import { ChangeEvent, useState } from 'react'

export type QuestName = '1차 성장' | '2차 성장' | '3차 성장'

export type QuestSuccess = {
  name: QuestName
  lv: number
  fragment: number
  trace: number
}

const toNonNegativeInt = (raw: string) => {
  if (raw.trim() === '') return 0
  const n = Number(raw)
  if (Number.isNaN(n) || !Number.isFinite(n)) return 0
  return Math.max(0, Math.floor(n))
}

export const useQuestSuccessForm = (initialName: QuestName = '1차 성장') => {
  const [currentQuest, setCurrentQuest] = useState<QuestSuccess>({
    name: initialName,
    lv: 0,
    fragment: 0,
    trace: 0,
  })

  const setName = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value as QuestName

    setCurrentQuest((prev) => ({
      ...prev,
      name,
    }))
  }

  const setLv = (e: ChangeEvent<HTMLInputElement>) => {
    const value = toNonNegativeInt(e.target.value)
    setCurrentQuest((prev) => ({
      ...prev,
      lv: Math.min(value, 300),
    }))
  }

  const setFragment = (e: ChangeEvent<HTMLInputElement>) => {
    const value = toNonNegativeInt(e.target.value)
    setCurrentQuest((prev) => ({
      ...prev,
      fragment: Math.min(value, 20000),
    }))
  }

  const setTrace = (e: ChangeEvent<HTMLInputElement>) => {
    const value = toNonNegativeInt(e.target.value)
    setCurrentQuest((prev) => ({
      ...prev,
      trace: Math.min(value, 1000),
    }))
  }

  return {
    currentQuest,
    setName,
    setLv,
    setFragment,
    setTrace,
  }
}
