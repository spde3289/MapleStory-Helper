import { BossId } from '@/constants/bosses'

export type BossDifficultyType =
  | '이지'
  | '노멀'
  | '하드'
  | '카오스'
  | '익스트림'

export interface BossDifficulty {
  difficulty: BossDifficultyType
  price: number
}

export interface BossInfo {
  bossId: BossId
  bossName: string
  difficulties: readonly BossDifficulty[]
}

export type BossInfoList = BossInfo[]
