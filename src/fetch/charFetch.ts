import { MainCharacterResponse } from '@/type/axios/characterType'
import {
  ResponseDataType,
  ResponseErrorDataType,
} from '@/type/axios/commonType'
import axios from 'axios'
import { Get } from './client'
import Paths from './path'

export const getCharInfo = async (
  characterName: string,
): Promise<ResponseDataType<MainCharacterResponse>> => {
  try {
    const characterResponse = await Get<
      ResponseDataType<MainCharacterResponse>
    >(Paths.character, {
      params: {
        character_name: characterName,
      },
    })
    return characterResponse.data
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
