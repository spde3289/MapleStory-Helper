import {
  BasicResponse,
  CharacterIdResponse,
  MainCharacterResponse,
  StatResponse,
} from '@/type/axios/characterType'
import {
  APIResponseErrorDataType,
  ResponseDataType,
} from '@/type/axios/commonType'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Get } from '../backEnd'
import { Paths } from '../path'

// 캐릭터 기본정보 + 스텟 정보
const getCharacter = async (
  character_name: string,
): Promise<ResponseDataType<MainCharacterResponse>> => {
  try {
    // 1단계: 캐릭터 식별자 가져오기
    const idResponse = await Get<CharacterIdResponse>(Paths.Ocid, {
      params: { character_name },
    })
    const { ocid } = idResponse.data
    // 2단계: 캐릭터 기본 정보 가져오기
    const basicResponse = await Get<BasicResponse>(Paths.CharBasic, {
      params: { ocid },
    })
    // 3단계: 캐릭터 스텟 정보 가져오기
    const statResponse = await Get<StatResponse>(Paths.CharStat, {
      params: { ocid },
    })

    const statData = {
      remain_ap: statResponse.data.remain_ap,
      final_stat: statResponse.data.final_stat.map((stat) => {
        return {
          stat_name: stat.stat_name,
          stat_value: Number(stat.stat_value),
        }
      }),
    }

    return {
      status: 200,
      statusText: 'OK',
      data: { ...idResponse.data, ...basicResponse.data, ...statData },
    } // 캐릭터 기본 정보 반환
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
  res: NextApiResponse<ResponseDataType<MainCharacterResponse>>,
) {
  const { character_name } = req.query
  // 캐릭터 get 요청
  if (req.method === 'GET' && typeof character_name === 'string') {
    // 외부 API 요청
    const response = await getCharacter(character_name)
    if (response.status === 200) {
      res.status(200).json(response) // 데이터를 클라이언트에 응답
    } else {
      res.status(response.status).json(response) // 에러 데이터를 클라이언트에 응답
    }
  }
}
