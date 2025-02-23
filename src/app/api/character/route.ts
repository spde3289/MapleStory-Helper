import { Get } from '@/fetch/backend'
import { Paths } from '@/fetch/backend/path'
import {
  BasicResponse,
  CharacterIdResponse,
  MainCharacterResponse,
  StatResponse,
} from '@/type/axios/characterType'
import { NextResponse } from 'next/server'

// 캐릭터 기본정보 + 스텟 정보
const getCharacter = async (
  character_name: string,
): Promise<MainCharacterResponse> => {
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

  // 반환 부분 변경
  return {
    ...idResponse.data,
    ...basicResponse.data,
    ...statData,
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const character_name = searchParams.get('character_name')

  try {
    if (!character_name) {
      return NextResponse.json(
        {
          statusText: '캐릭어 닉네임을 제출해주세요',
          name: '',
        },
        { status: 400 },
      )
    }

    const response = await getCharacter(character_name)
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      {
        statusText: error.message || '알 수 없는 에러',
        name: error.name || '알 수 없는 에러',
      },
      { status: error.status || 400 },
    )
  }
}
