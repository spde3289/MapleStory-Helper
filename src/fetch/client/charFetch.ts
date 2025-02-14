import { MainCharacterResponse } from '@/type/axios/characterType'
import { Get } from '.'
import Paths from './path'

export const getCharInfo = async (
  characterName: string,
): Promise<MainCharacterResponse> => {
  const characterResponse = await Get<MainCharacterResponse>(Paths.character, {
    params: {
      character_name: characterName,
    },
  })

  return characterResponse.data
}
