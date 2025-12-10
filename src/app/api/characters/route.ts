import { getCharacterList } from '@/lib/nexonApi/characterApi'
import { ApiError } from '@/lib/nexonApi/nexonClient'
import { fetchCharacterFullInfo } from '@/lib/sever/fetchCharacterInfo' // 위치에 맞게 수정

export const splitSettled = <T>(results: PromiseSettledResult<T>[]) => {
  const success: T[] = []
  const errors: any[] = []

  for (const r of results) {
    if (r.status === 'fulfilled') {
      success.push(r.value)
    } else {
      errors.push(r.reason)
    }
  }

  return { success, errors }
}

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const apiKey = req.headers.get('x-user-api-key')
  const minLevelParam = searchParams.get('minLevel')
  const minPowerParam = searchParams.get('minPower')

  const minLevel = minLevelParam ? Number(minLevelParam) : undefined
  const minPower = minPowerParam ? Number(minPowerParam) : undefined

  try {
    if (minPower !== undefined && minLevel === undefined) {
      throw new ApiError({
        message: 'minPower는 minLevel과 함께 사용해야 합니다.',
        status: 400,
        type: 'PowerFilterRequiresLevel',
      })
    }

    const data = await getCharacterList(apiKey as string)

    const allCharacters = data.account_list[0].character_list

    const hasMinLevel = minLevel !== undefined
    const hasMinPower = minPower !== undefined

    if (!hasMinLevel && !hasMinPower) {
      const fullList = await Promise.allSettled(
        allCharacters.map((ch) => fetchCharacterFullInfo(ch.character_name)),
      )

      const { success, errors } = splitSettled(fullList)

      return Response.json({
        success,
        errors,
      })
    }

    if (hasMinLevel) {
      const levelFiltered = allCharacters.filter(
        (ch) => ch.character_level >= minLevel,
      )

      const fullList = await Promise.allSettled(
        levelFiltered.map((ch) => fetchCharacterFullInfo(ch.character_name)),
      )

      const { success, errors } = splitSettled(fullList)

      if (!hasMinPower) {
        return Response.json({
          success,
          errors,
        })
      }

      const powerFiltered = success.filter(
        (full) => full.userStat.combat_power >= minPower,
      )

      return Response.json({
        characters: powerFiltered,
      })
    }
  } catch (error: any) {
    if (error instanceof ApiError) {
      return Response.json(
        {
          ...error,
        },
        { status: error.status },
      )
    }

    return Response.json(
      { errorType: 'UnknownError', message: '알 수 없는 서버 에러입니다.' },
      { status: 500 },
    )
  }
}
