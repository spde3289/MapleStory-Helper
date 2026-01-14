import { SERVER_ERROR_TYPES } from '@/constants/errors/severErrorTypes'
import { ApiError } from '@/lib/nexonApi/nexon'
import { buildCharacterFullInfo } from '@/lib/server/buildCharacterFullInfo'
import { NextResponse } from 'next/server'

export const GET = async (
  req: Request,
  context: { params: Promise<{ characterName: string }> },
) => {
  const { characterName } = await context.params

  try {
    const data = await buildCharacterFullInfo(characterName)

    return NextResponse.json(data)
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        new ApiError({
          ...error,
          message: error.message,
        }),
        { status: error.status ?? 500 },
      )
    }

    return NextResponse.json(
      new ApiError({
        ...error,
        type: SERVER_ERROR_TYPES.CHARACTER_FETCH_ERROR,
        message:
          error?.message ?? '캐릭터 정보를 불러오는 중 오류가 발생했습니다.',
        payload: {
          characterName,
        },
      }),
      { status: 500 },
    )
  }
}
