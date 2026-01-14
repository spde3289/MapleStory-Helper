import { BossId } from '@/constants/domain/bosses'
import type { BossDifficultyType } from '@/types/domain/boss'
import { CharacterFullInfo } from '@/types/domain/character'

export interface ClearedBoss {
  bossId: BossId
  difficulty: BossDifficultyType | null
  partySize: number
}

export interface JuboCharacter {
  characterName: string
  characterInfo: CharacterFullInfo
  bosses: ClearedBoss[]
}
