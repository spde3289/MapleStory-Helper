'use client'

import ItemContainer from '@/components/common/ItemContainer'
import Button from '@/components/ui/button/Button'

import { BOSSES } from '@/constants/bosses'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import type { ClearedBoss } from '@/types/storage/JubocCharacter'
import { formatKoreanNumber, formatToEokUnit } from '@/utils/numberUtils'

import { memo, useMemo, useState } from 'react'

// 너 프로젝트에 이미 있던 유틸/컴포넌트라고 가정
// import WorldImage from '...'
// import { formatKoreanNumber, formatToEokUnit } from '...'

const EasterEgg = process.env.NEXT_PUBLIC_EASTER_EGG

interface GemSectionPropsType {
  unit: '일반' | '유닛'
  unitHandler: React.MouseEventHandler<HTMLButtonElement>
}

const maxGem = 90

const manageArrayLength = (arr: number[]) => {
  if (arr.length > maxGem) {
    arr.splice(0, arr.length - maxGem) // 초과된 요소를 한꺼번에 삭제 (오름차순이면 상위 90개만 남음)
  }
  return arr
}

const addPrice = (numbers: number[]): number => {
  return numbers.reduce((sum, current) => sum + current, 0)
}

type BossId = (typeof BOSSES)[number]['bossId']
type BossDifficultyType =
  (typeof BOSSES)[number]['difficulties'][number]['difficulty']

type PriceKey = `${BossId}__${BossDifficultyType}`

const CrystalSalePriceSection = ({
  unit,
  unitHandler,
}: GemSectionPropsType) => {
  const [value, setValue] = useState<number>(0)

  const characters = useJuboCharacterStore((s) => s.characters)

  // (bossId + difficulty) -> price 인덱스
  const priceIndex = useMemo(() => {
    const map = new Map<PriceKey, number>()
    for (const boss of BOSSES) {
      for (const d of boss.difficulties) {
        map.set(`${boss.bossId}__${d.difficulty}`, d.price)
      }
    }
    return map
  }, [])

  const worldGemObject = useMemo(() => {
    // 월드 목록
    const uniqueWorldNames = Array.from(
      new Set(
        characters.map(
          (c) => c.characterInfo.userInfo.world_name, // ✅ CharacterFullInfo 기준
        ),
      ),
    )

    return uniqueWorldNames.map((world) => {
      // 월드에 속한 캐릭터들의 선택 보스들을 모두 합쳐서 계산
      const allCrystalValuesInWorld: number[] = characters.flatMap((char) => {
        const worldName = char.characterInfo.userInfo.world_name
        if (worldName !== world) return []

        // 선택 보스 -> price/partySize
        return char.bosses
          .map((b: ClearedBoss) => {
            const key =
              `${b.bossId as BossId}__${b.difficulty as BossDifficultyType}` as const
            const price = priceIndex.get(key)
            if (price == null) return null

            const party = b.partySize > 0 ? b.partySize : 1
            return price / party
          })
          .filter((v): v is number => v !== null)
      })

      // 오름차순 정렬 후, 상위 90개만 유지 (기존 로직 유지)
      const sorted = [...allCrystalValuesInWorld].sort((a, b) => a - b)

      const rawCount = sorted.length
      const managed = manageArrayLength(sorted) // 여기서 배열 길이가 최대 90으로 줄어듦
      const usedCount = managed.length

      return {
        name: world,
        rawCount,
        usedCount,
        price: addPrice(managed),
      }
    })
  }, [characters, priceIndex])

  const hidden = useMemo(() => {
    if (!EasterEgg) return false
    return characters.some((c) => c.characterName === EasterEgg)
  }, [characters])

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '')
    if (inputValue.length <= 5) setValue(Number(inputValue))
  }

  const totalPrice = useMemo(() => {
    return worldGemObject.reduce((acc, cur) => acc + cur.price, 0)
  }, [worldGemObject])

  return (
    <ItemContainer
      className="relative lg:min-w-96"
      title="결정석 판매 가격"
      tip="상위 90개의 결정석만 계산합니다."
    >
      <Button onClick={unitHandler}>{unit}</Button>

      <div className="flex mt-2 group flex-col w-full">
        {worldGemObject.map((world, index) => (
          <div
            key={world.name}
            style={
              worldGemObject.length - 1 === index
                ? { borderBottom: ' ' }
                : { borderBottom: '1px solid #e5e7eb' }
            }
            className="py-4 flex xsm:flex-col lg:flex-row justify-between gap-2"
          >
            <span className="flex gap-2 h-fit">
              {/* <WorldImage world_name={world.name} size={24} /> */}
              {world.name}
            </span>

            <span className="flex gap-2 flex-col xsm:flex-row lg:flex-col justify-between text-right">
              <span>
                결정석 제한 :{' '}
                <span
                  style={
                    world.rawCount > maxGem
                      ? { color: '#dc2626' }
                      : { color: '#16a34a' }
                  }
                  className="text-gray-900 dark:text-white/90"
                >
                  {world.usedCount}
                </span>{' '}
                / {maxGem}
                {world.rawCount > maxGem && (
                  <span className="ml-2 text-xs text-gray-500">
                    (총 {world.rawCount}개 중 상위 {maxGem}개만)
                  </span>
                )}
              </span>

              <span>
                수익 :{' '}
                {unit === '유닛'
                  ? Math.floor(world.price).toLocaleString()
                  : formatKoreanNumber(Math.floor(world.price))}{' '}
                메소
              </span>
            </span>
          </div>
        ))}

        {worldGemObject.length > 1 && (
          <div
            style={hidden ? { marginBottom: '8px' } : undefined}
            className="border-t pt-2 text-right"
          >
            총 수익 :{' '}
            {unit === '유닛'
              ? Math.floor(totalPrice).toLocaleString()
              : formatKoreanNumber(Math.floor(totalPrice))}{' '}
            메소
          </div>
        )}

        {hidden && (
          <div className="flex gap-2 items-center justify-end border-t pt-2">
            <div>{formatToEokUnit(totalPrice)}억</div>X
            <div>
              <input
                onChange={inputHandler}
                value={value}
                className="rounded-lg outline-none w-20 p-1 bg-gray-100 dark:bg-gray-800 dark:border-white/[0.2]"
              />
              원
            </div>
            <div className="text-right w-28">
              {(formatToEokUnit(totalPrice) * value).toLocaleString()} 원
            </div>
          </div>
        )}
      </div>

      {characters.length !== 0 && <div className="absolute right-3 top-4" />}
    </ItemContainer>
  )
}

export default memo(CrystalSalePriceSection)
