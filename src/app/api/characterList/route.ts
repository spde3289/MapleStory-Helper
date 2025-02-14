import { Get } from '@/fetch/backend'
import { Paths } from '@/fetch/backend/path'
import { CharListResponse } from '@/type/axios/charListType'
import { NextResponse } from 'next/server'

const getCharacterList = async (ApiKey: string): Promise<CharListResponse> => {
  const response = await Get<CharListResponse>(Paths.CharList, {
    headers: { 'x-nxopen-api-key': ApiKey },
  })

  return response.data
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ApiKey = searchParams.get('ApiKey')

  if (!ApiKey) {
    return NextResponse.json(
      {
        statusText: '올바른 API KEY를 입력해 주세요',
        name: 'MissingApiKey',
      },
      { status: 400 },
    )
  }

  try {
    const response = await getCharacterList(ApiKey)

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
