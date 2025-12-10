import { getCharacterList } from '@/lib/nexonApi/characterApi'
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

  if (!apiKey) {
    return Response.json(
      {
        statusText: '올바른 API KEY를 입력해 주세요',
        name: 'MissingApiKey',
      },
      { status: 400 },
    )
  }

  if (
    (minLevelParam && Number.isNaN(minLevel)) ||
    (minPowerParam && Number.isNaN(minPower))
  ) {
    return Response.json(
      {
        statusText: 'minLevel, minPower는 숫자여야 합니다.',
        name: 'InvalidFilterParam',
      },
      { status: 400 },
    )
  }

  if (minPower !== undefined && minLevel === undefined) {
    return Response.json(
      {
        statusText: 'minPower는 minLevel과 함께 사용해야 합니다.',
        name: 'PowerFilterRequiresLevel',
      },
      { status: 400 },
    )
  }

  try {
    const data = await getCharacterList(apiKey)

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
    return Response.json(
      { errorType: 'FETCH_CHARACTERS_ERROR', error },
      { status: error.status ?? 500 },
    )
  }
}
