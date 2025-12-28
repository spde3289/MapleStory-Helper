import {
  getCharacterBasic,
  getCharacterStat,
} from '@/lib/nexonApi/characterApi'
import { ApiErrorResponse } from './apiErrors'

export interface CharacterFullInfo {
  ocid: string
  userInfo: Awaited<ReturnType<typeof getCharacterBasic>>
  userStat: Awaited<ReturnType<typeof getCharacterStat>>
}

export interface CharactersInfo {
  success: CharacterFullInfo[]
  errors: ApiErrorResponse[]
}
