import { BossType } from '@/data/boss'
import { CharListResponse } from '@/type/axios/charListType'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { AxiosResponse } from 'axios'
import { Get } from '.'
import Paths from './path'

type InputType = `test_${string}` | `live_${string}` // 정상적인 타입 선언

const isApiKeyTypeCheck = (value: any): value is InputType => {
  return value.startsWith('test_') || value.startsWith('live_')
}

type localStorageCharListType = {
  character_name: string
  boss: BossType
}[]

export const getCharList = async (
  data: string | localStorageCharListType,
): Promise<MainCharacterResponse[]> => {
  const level220PlusCharacters: any[] = []

  if (Array.isArray(data)) {
    data.forEach((el) => level220PlusCharacters.push(el.character_name))
  } else if (isApiKeyTypeCheck(data)) {
    const characterListResponse = await Get<CharListResponse>(
      Paths.characterList,
      {
        params: {
          ApiKey: data,
        },
      },
    )
    // 220 레벨을 넘는 캐릭터 리스트
    characterListResponse.data?.account_list[0].character_list.forEach((el) => {
      if (el.character_level >= 220)
        level220PlusCharacters.push(el.character_name)
    })
  }
  const level220PlusCharactersResponse: MainCharacterResponse[] = []

  if (level220PlusCharacters?.length) {
    try {
      const responses = await Promise.allSettled(
        level220PlusCharacters.map((character) =>
          Get<MainCharacterResponse>(Paths.character, {
            params: { character_name: character },
          }),
        ),
      )

      const filteredData = responses
        .filter(
          (
            result,
          ): result is PromiseFulfilledResult<
            AxiosResponse<MainCharacterResponse, any>
          > => result.status === 'fulfilled',
        )
        .map((result) => result.value.data)
        .filter(
          (characterData) =>
            characterData &&
            characterData.final_stat[42]?.stat_value >= 3000000,
        )

      level220PlusCharactersResponse.push(...filteredData)
    } catch (error) {
      console.error('요청 중 오류가 발생했습니다:', error)
    }
  }

  return level220PlusCharactersResponse
}
