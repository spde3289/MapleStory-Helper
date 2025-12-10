import { ApiError } from '@/lib/nexonApi/nexonClient'
import { fetchCharacterFullInfo } from '@/lib/sever/fetchCharacterInfo'
import { NextResponse } from 'next/server'

export const GET = async (
  req: Request,
  context: { params: Promise<{ characterName: string }> },
) => {
  const { characterName } = await context.params

  try {
    const data = await fetchCharacterFullInfo(characterName)

    return NextResponse.json(data)
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          ...error,
        },
        { status: error.status ?? 500 },
      )
    }

    return NextResponse.json(
      {
        errorType: 'FETCH_CHARACTER_ERROR',
        message:
          error?.message ?? '캐릭터 정보를 불러오는 중 오류가 발생했습니다.',
        payload: {
          characterName,
        },
      },
      { status: 500 },
    )
  }
}
