import { BossId } from '@/constants/domain/bosses'
import { CharacterFullInfo } from '@/types/domain/character/character'
import type { BossDifficultyType } from '@/types/domain/game/bosstype'

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
