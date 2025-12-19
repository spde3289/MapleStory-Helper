import { BossId } from '@/constants/bosses'
import { CharacterFullInfo } from '@/types/api/character'
import type { BossDifficultyType } from '@/types/models/game/Boss'

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
