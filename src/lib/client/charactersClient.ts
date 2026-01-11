import { ROUTER_ENDPOINTS } from '@/constants/routers/routerEndpoints'
import {
  CharacterFullInfo,
  CharactersInfo,
} from '@/types/domain/character/character'
import { splitSettled } from '@/utils/promise'
import { client } from './client'

type FetchCharactersParams = {
  minLevel?: number
  minPower?: number
}

// 전체 캐릭터 요청
export const fetchCharacters = async (
  ApiKey: string,
  params?: FetchCharactersParams,
): Promise<CharactersInfo> => {
  const { data } = await client.get<CharactersInfo>(
    ROUTER_ENDPOINTS.CHARACTER.LIST,
    {
      headers: { 'x-user-api-key': ApiKey },
      params,
    },
  )

  return data
}

// 단일 캐릭터 요청
export const fetchCharacter = async (
  characterName: string,
): Promise<CharacterFullInfo> => {
  const { data } = await client.get<CharacterFullInfo>(
    ROUTER_ENDPOINTS.CHARACTER.SINGLE(characterName),
  )

  return data
}

export const fetchCharactersByNames = async (characterNames: string[]) => {
  const fullList = await Promise.allSettled(
    characterNames.map((name) => fetchCharacter(name)),
  )

  const { success, errors } = splitSettled(fullList)
  return {
    success,
    errors,
  }
}
