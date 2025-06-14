import { ChangeEventHandler } from 'react'

export interface currentQuestType {
  boss: string
  gauge: number
}

export type bossListType = {
  name: string
  krName: string
  player: number
  type: {
    difficulty: string
    reward: number
    current: boolean
  }[]
}[]

export interface CalculateProps {
  currentQuest: currentQuestType
  bossList: bossListType
  handleBossList: {
    handleType: ChangeEventHandler<HTMLInputElement>
    handlePlayer: ChangeEventHandler<HTMLSelectElement>
  }
  handleQuest: {
    handleBoss: ChangeEventHandler<HTMLSelectElement>
    handleGauge: ChangeEventHandler<HTMLInputElement>
  }
}
