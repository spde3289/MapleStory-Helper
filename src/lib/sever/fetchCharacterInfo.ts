import {
  getCharacterBasic,
  getCharacterOcid,
  getCharacterStat,
} from '@/lib/nexonApi/characterApi'
import { ApiError } from '../nexonApi/nexonClient'

export interface CharacterFullInfo {
  ocid: string
  userInfo: Awaited<ReturnType<typeof getCharacterBasic>>
  userStat: Awaited<ReturnType<typeof getCharacterStat>>
}

export const fetchCharacterFullInfo = async (characterName: string) => {
  try {
    const { ocid } = await getCharacterOcid(characterName)
    const basicData = await getCharacterBasic(ocid)
    const userStat = await getCharacterStat(ocid)

    return {
      ocid,
      userInfo: basicData,
      userStat,
    }
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw new ApiError({
        ...err,
        message: err.message,
        payload: {
          ...(err.payload ?? {}),
          characterName,
        },
      })
    }

    throw new ApiError({
      message: '캐릭터 전체 정보를 불러오는 동안 오류 발생',
      type: 'FetchCharacterFullInfoError',
      status: 500,
      payload: {
        characterName,
        originalError: err,
      },
    })
  }
}
