export type BossDifficultyType =
  | '이지'
  | '노멀'
  | '하드'
  | '카오스'
  | '익스트림'

export type BossDifficulty = {
  difficulty: BossDifficultyType
  price: number
}

export type BossInfo = {
  bossId: string
  bossName: string
  difficulties: BossDifficulty[]
}

export type BossInfoList = BossInfo[]
