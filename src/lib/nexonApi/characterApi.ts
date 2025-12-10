import {
  CharacterStats,
  STAT_KEY,
  StatKeyMap,
} from '@/types/models/character/characterStat'
import {
  CharacterBasicResponse,
  CharacterIdResponse,
  CharacterListResponse,
  CharacterStatResponse,
} from '@/types/nexon/character'
import { MAPLE_ENDPOINTS, nexonClient } from './nexonClient'

// 캐릭터 리스트
export const getCharacterList = async (
  ApiKey: string,
): Promise<CharacterListResponse> => {
  const response = await nexonClient.get<CharacterListResponse>(
    MAPLE_ENDPOINTS.character.list,
    {
      headers: { 'x-nxopen-api-key': ApiKey },
    },
  )

  return response.data
}

// 캐릭터 OCID 조회
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
): Promise<CharacterBasicResponse> => {
  const { data } = await nexonClient.get<CharacterBasicResponse>(
    MAPLE_ENDPOINTS.character.basic,
    {
      params: { ocid },
    },
  )

  return data
}

// 캐릭터 스탯 정보 조회
export const getCharacterStat = async (
  ocid: string,
): Promise<CharacterStats> => {
  const { data } = await nexonClient.get<CharacterStatResponse>(
    MAPLE_ENDPOINTS.character.stat,
    {
      params: { ocid },
    },
  )

  const userStat = data.final_stat.reduce((acc, stat) => {
    const key = STAT_KEY[stat.stat_name as keyof StatKeyMap]

    if (!key) {
      throw {
        type: 'StatParseError',
        statName: stat.stat_name,
        statValue: stat.stat_value,
        message: `매핑되지 않은 스탯: ${stat.stat_name}`,
      }
    }

    const value = Number(stat.stat_value)
    if (Number.isNaN(value)) {
      throw {
        type: 'StatParseError',
        statName: stat.stat_name,
        statValue: stat.stat_value,
        message: `stat_value 숫자 변환 실패`,
      }
    }

    acc[key] = value
    return acc
  }, {} as CharacterStats)

  return userStat
}
