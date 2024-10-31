import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Get } from '../backEnd'

// 대표캐릭터 기본정보 + 스텟 정보
const getCharacter = async (character_name: string): Promise<Data> => {
  try {
    // 1단계: 대표캐릭터 식별자 가져오기
    const idResponse = await Get<CharacterIdResponse>('/v1/id', {
      params: { character_name },
    })
    const { ocid } = idResponse.data

    // 2단계: 대표캐릭터 기본 정보 가져오기
    const basicResponse = await Get<BasicResponse>('/v1/character/basic', {
      params: { ocid },
    })

    // 3단계: 대표캐릭터 스텟 정보 가져오기
    const statResponse = await Get<StatResponse>('/v1/character/stat', {
      params: { ocid },
    })

    return {
      status: 200,
      statusText: 'OK',
      data: { ...basicResponse.data, ...statResponse.data, ...idResponse.data },
    } // 캐릭터 기본 정보 반환
  } catch (error) {
    if (axios.isAxiosError<ResponseDataType, any>(error)) {
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

export const getMapleKey = () => process.env.NEXT_PUBLIC_MAPLEAPI_KEY

type Data = {
  data?: BasicResponse & StatResponse & CharacterIdResponse
  status: number
  statusText: string
  name?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { character_name } = req.query
  // 대표캐릭터 get 요청
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

interface ResponseDataType {
  statusText: string
  status: number
  error: {
    name: string
    message: string
  }
}

interface CharacterIdResponse {
  ocid: string
}
interface BasicResponse {
  date: string
  character_name: string
  world_name: string
  character_gender: string
  character_class: string
  character_class_level: string
  character_level: number
  character_exp: number
  character_exp_rate: string
  character_guild_name: string
  character_image: string
  character_date_create: string
  access_flag: string
  liberation_quest_clear_flag: string
}
interface StatResponse {
  date: string
  character_class: string
  final_stat: {
    stat_name: string
    stat_value: string
  }[]
  remain_ap: number
}
