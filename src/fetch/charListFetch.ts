import { CharListResponse } from '@/type/axios/charListType'
import { MainCharacterResponse } from '@/type/axios/characterType'
import {
  ResponseDataType,
  ResponseErrorDataType,
} from '@/type/axios/commonType'
import axios from 'axios'
import { Get } from './client'
import Paths from './path'

export const getCharList = async (
  ApiKey: string,
): Promise<ResponseDataType<MainCharacterResponse[]>> => {
  try {
    const characterListResponse = await Get<ResponseDataType<CharListResponse>>(
      Paths.characterList,
      {
        params: {
          ApiKey,
        },
      },
    )
    // 220 레벨을 넘는 캐릭터 리스트
    const level220PlusCharacters =
      characterListResponse.data.data?.account_list[0].character_list.filter(
        (el) => el.character_level >= 220,
      )

    const level220PlusCharactersResponse: MainCharacterResponse[] = []

    if (level220PlusCharacters?.length) {
      try {
        const responses = await Promise.all(
          level220PlusCharacters.map((character) => {
            return axios.get<ResponseDataType<MainCharacterResponse>>(
              `http://localhost:3000/api${Paths.character}`,
              {
                params: { character_name: character.character_name },
              },
            )
          }),
        )

        responses.forEach((response) => {
          if (
            response?.data?.data &&
            response.data.data.final_stat[42].stat_value >= 3000000
          ) {
            level220PlusCharactersResponse.push(response.data.data)
          }
        })
      } catch (error) {
        console.error('요청 중 오류가 발생했습니다:', error)
      }
    }

    return {
      data: level220PlusCharactersResponse,
      status: 200,
      statusText: 'OK',
    }
  } catch (error) {
    if (axios.isAxiosError<ResponseErrorDataType, any>(error)) {
      return {
        status: error.response?.status ? error.response.status : 400,
        statusText: error.response?.data.statusText
          ? error.response.data.statusText
          : '에러',
        name: error.response?.data.name ? error.response.data.name : '에러',
      }
    }
    return {
      status: 400,
      statusText: 'An unexpected error occurred',
    }
  }
}
