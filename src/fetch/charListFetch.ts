import { CharListResponse } from '@/type/axios/charListType'
import {
  ResponseDataType,
  ResponseErrorDataType,
} from '@/type/axios/commonType'
import axios from 'axios'
import { Get } from './client'
import Paths from './path'

export const getCharList = async (
  ApiKey: string,
): Promise<ResponseDataType<CharListResponse>> => {
  try {
    const characterResponse = await Get<ResponseDataType<CharListResponse>>(
      Paths.characterList,
      {
        params: {
          ApiKey,
        },
      },
    )
    console.log(characterResponse)
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
