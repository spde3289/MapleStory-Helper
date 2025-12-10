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
    return NextResponse.json(
      {
        errorType: 'FETCH_CHARACTER_ERROR',
        error: error.error ?? error,
        characterName,
      },
      { status: error.status ?? 500 },
    )
  }
}
