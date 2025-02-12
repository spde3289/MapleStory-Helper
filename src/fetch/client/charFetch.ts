import { MainCharacterResponse } from '@/type/axios/characterType'
import { ResponseDataType } from '@/type/axios/commonType'
import { Get } from './client'
import Paths from './path'

export const getCharInfo = async (
  characterName: string,
): Promise<ResponseDataType<MainCharacterResponse>> => {
  const characterResponse = await Get<ResponseDataType<MainCharacterResponse>>(
    Paths.character,
    {
      params: {
        character_name: characterName,
      },
    },
  )

  return characterResponse.data
}
