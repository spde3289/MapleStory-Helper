import { CharListResponse } from '@/type/axios/charListType'
import {
  APIResponseErrorDataType,
  ResponseDataType,
} from '@/type/axios/commonType'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Get } from '../backEnd'
import { Paths } from '../path'

// 캐릭터 기본정보 + 스텟 정보
const getCharacterList = async (
  ApiKey: string,
): Promise<ResponseDataType<CharListResponse>> => {
  try {
    // 1단계: 보유 캐릭터 리스트 가져오기
    const charListResponse = await Get<CharListResponse>(Paths.CharList, {
      headers: { 'x-nxopen-api-key': ApiKey },
    })

    return {
      status: 200,
      statusText: 'OK',
      data: { ...charListResponse.data },
    }
  } catch (error) {
    if (axios.isAxiosError<APIResponseErrorDataType, any>(error)) {
      return {
        status: error.response?.status ? error.response?.status : 400,
        statusText: error.response?.data.error.message
          ? error.response?.data.error.message
          : '에러',
        name: error.response?.data.error.name
          ? error.response?.data.error.name
          : '에러',
      }
    }
    return {
      status: 400,
      statusText: 'An unexpected error occurred',
      name: '',
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType<CharListResponse>>,
) {
  const { ApiKey } = req.query
  // 캐릭터 get 요청
  if (req.method === 'GET' && typeof ApiKey === 'string') {
    // 외부 API 요청
    const response = await getCharacterList(ApiKey)

    if (response.status === 200) {
      res.status(200).json(response) // 데이터를 클라이언트에 응답
    } else {
      res.status(response.status).json(response) // 에러 데이터를 클라이언트에 응답
    }
  }
}
