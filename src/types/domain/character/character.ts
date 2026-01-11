import { CharacterBasicResponse } from '@/types/nexon/character'
import { ApiErrorResponse } from '../../error/apiErrors'
import { CharacterStats } from './charstat'

export interface CharacterFullInfo {
  ocid: string
  userInfo: CharacterBasicResponse
  userStat: CharacterStats
}

export interface CharactersInfo {
  success: CharacterFullInfo[]
  errors: ApiErrorResponse[]
}
