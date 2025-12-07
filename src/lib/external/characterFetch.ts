import {
  BasicResponse,
  CharacterIdResponse,
  StatResponse,
} from '@/type/axios/characterType'
import { CharListResponse } from '@/type/axios/charListType'
import { MAPLE_ENDPOINTS, nexonClient } from './nexonClient'

// 캐릭터 리스트
export const getCharacterList = async (
  ApiKey: string,
): Promise<CharListResponse> => {
  const response = await nexonClient.get<CharListResponse>(
    MAPLE_ENDPOINTS.character.list,
    {
      headers: { 'x-nxopen-api-key': ApiKey },
    },
  )

  return response.data
}

export const getCharacterOcid = async (
  character_name: string,
): Promise<CharacterIdResponse> => {
  const { data } = await nexonClient.get<CharacterIdResponse>(
    MAPLE_ENDPOINTS.character.ocid,
    {
      params: { character_name },
    },
  )

  return data
}

// 캐릭터 기본 정보 조회
export const getCharacterBasic = async (
  ocid: string,
): Promise<BasicResponse> => {
  const { data } = await nexonClient.get<BasicResponse>(
    MAPLE_ENDPOINTS.character.basic,
    {
      params: { ocid },
    },
  )

  return data
}

// 캐릭터 스탯 정보 조회
export const getCharacterStat = async (ocid: string): Promise<StatResponse> => {
  const { data } = await nexonClient.get<StatResponse>(
    MAPLE_ENDPOINTS.character.stat,
    {
      params: { ocid },
    },
  )

  return data
}
