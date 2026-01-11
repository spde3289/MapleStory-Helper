import { SERVER_ERROR_TYPES } from '@/constants/errors/severErrorTypes'
import {
  getCharacterBasic,
  getCharacterOcid,
  getCharacterStat,
} from '@/lib/nexonApi/characterApi'
import { CharacterFullInfo } from '@/types/domain/character'
import { ApiError } from '../nexonApi/nexon'

export const buildCharacterFullInfo = async (
  characterName: string,
): Promise<CharacterFullInfo> => {
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
      type: SERVER_ERROR_TYPES.CHARACTER_FULL_INFO_FETCH_ERROR,
      status: 500,
      payload: {
        characterName,
        originalError: err,
      },
    })
  }
}
