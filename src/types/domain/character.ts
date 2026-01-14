import { STAT_KEY } from '@/constants/domain/characterStat'
import { CharacterBasicResponse } from '@/types/nexon/character'
import { ApiErrorResponse } from '../error/apiErrors'

export type StatKeyMap = typeof STAT_KEY

export type StatKeyEnglish = StatKeyMap[keyof StatKeyMap]

export type CharacterStats = Record<StatKeyEnglish, number>

export interface CharacterFullInfo {
  ocid: string
  userInfo: CharacterBasicResponse
  userStat: CharacterStats
}

export interface CharactersInfo {
  success: CharacterFullInfo[]
  errors: ApiErrorResponse[]
}
