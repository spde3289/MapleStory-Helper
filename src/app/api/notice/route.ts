import { SERVER_ERROR_TYPES } from '@/constants/errors/severErrorTypes'
import { ApiError } from '@/lib/nexonApi/nexon'
import { buildNoticeList } from '@/lib/server/getNoticeListByType'
import { NOTICE_TYPES, NoticeType } from '@/types/domain/notice'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') as NoticeType

  try {
    if (!type || !NOTICE_TYPES.includes(type)) {
      throw new ApiError({
        status: 400,
        message: '올바른 공고 타입을 보내주세요',
        type: SERVER_ERROR_TYPES.NOTICE_TYPE_ERROR,
      })
    }

    const data = await buildNoticeList(type)

    return NextResponse.json(data)
  } catch (error: any) {
    if (error instanceof ApiError) {
      return Response.json(
        new ApiError({
          ...error,
          message: error.message,
        }),
        { status: error.status ?? 500 },
      )
    }

    return Response.json(
      new ApiError({
        ...error,
        type: SERVER_ERROR_TYPES.NOTICES_FETCH_ERROR,
        message: '알 수 없는 서버 에러입니다.',
      }),
      { status: 500 },
    )
  }
}
