export type BossDifficultyPrice = {
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'CHAOS' | 'EXTREME'
  trace: number
}

export type BossTraceGroup = {
  bossId: string
  bossName: string
  player: number
  difficulties: BossDifficultyPrice[]
}

export type DailyQuestFragment = {
  area: string
  level: number
  fragment: number
}
