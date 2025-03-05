import ItemContainer from '@/components/common/ItemContainer'
import WorldImage from '@/components/common/WorldImage'
import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { formatKoreanNumber, formatToEokUnit } from '@/utils/numberUtils'
import { memo, useState } from 'react'

const EasterEgg = process.env.NEXT_PUBLIC_EASTER_EGG

interface GemSectionPropsType {
  unit: '일반' | '유닛'
  unitHandler: React.MouseEventHandler<HTMLButtonElement>
}

const maxGem = 90

const manageArrayLength = (arr: any[]) => {
  if (arr.length > maxGem) {
    arr.splice(0, arr.length - maxGem) // 초과된 요소를 한꺼번에 삭제
  }
  return arr
}

const addPrice = (numbers: number[]): number => {
  return numbers.reduce((sum, current) => sum + current, 0)
}

const GemSection = ({ unit, unitHandler }: GemSectionPropsType) => {
  const { characterInfoList } = useCharacterInfoListContext()
  const [value, setValue] = useState<number>(0)

  const uniqueWorldNames = Array.from(
    new Set(characterInfoList.map((character) => character.world_name)),
  )

  const worldGemObject = uniqueWorldNames.map((world) => {
    const currentBossList = characterInfoList
      .flatMap((char) => {
        if (world === char.world_name) {
          return char.boss
            .filter((boss) => boss.type.some((type) => type.current))
            .map((boss) => {
              const currentType = boss.type.find((type) => type.current)
              if (!currentType) return null
              return currentType.price / boss.player
            })
            .filter((item): item is number => item !== null) // null을 제거
        }
        return []
      })
      .sort((a, b) => a - b) // 가격 오름차순 정렬

    const managecurrentBossList = manageArrayLength(currentBossList)
    return {
      name: world,
      count: managecurrentBossList.length,
      price: addPrice(managecurrentBossList),
    }
  })

  const hidden = characterInfoList.some(
    (info) => info.character_name === EasterEgg,
  )

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '') // 숫자만 허용
    if (inputValue.length <= 5) {
      // 5자리로 제한
      setValue(Number(inputValue))
    }
  }

  const TotalPrice = worldGemObject.reduce((acc, cur) => {
    return acc + cur.price
  }, 0)

  return (
    <ItemContainer
      className="relative lg:min-w-96"
      title="결정석 판매 가격"
      tip="상위 90개의 결정석만 계산합니다."
    >
      <Button onClick={unitHandler}>{unit}</Button>
      <div className="flex mt-2 group flex-col w-full">
        {worldGemObject.map((world, index) => {
          return (
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
                <WorldImage world_name={world.name} size={24} />
                {world.name}
              </span>
              <span className="flex gap-2 flex-col xsm:flex-row lg:flex-col justify-between text-right">
                <span
                // className={`${world.count > maxGem ? 'text-red-600' : 'text-green-600'}`}
                >
                  결정석 제한 :
                  <span
                    style={
                      world.count > maxGem
                        ? { color: '#dc2626' }
                        : { color: '#16a34a' }
                    }
                    className="text-gray-900 dark:text-white/90"
                  >
                    {world.count}{' '}
                  </span>
                  / {maxGem}
                </span>
                <span key={world.name} className="">
                  수익 :
                  {unit === '유닛'
                    ? Math.floor(world.price).toLocaleString()
                    : formatKoreanNumber(Math.floor(world.price))}{' '}
                  메소
                </span>
              </span>
            </div>
          )
        })}
        {worldGemObject.length > 1 && (
          <div
            style={hidden ? { marginBottom: '8px' } : undefined}
            className="border-t pt-2 text-right"
          >
            총 수익 :{' '}
            {unit === '유닛'
              ? Math.floor(TotalPrice).toLocaleString()
              : formatKoreanNumber(Math.floor(TotalPrice))}{' '}
            메소
          </div>
        )}
        {hidden && (
          <div className="flex gap-2 items-center justify-end border-t pt-2">
            <div>{formatToEokUnit(TotalPrice)}억</div>X
            <div>
              <input
                onChange={inputHandler}
                value={value}
                className=" rounded-lg outline-none w-20 p-1 bg-gray-100 dark:bg-gray-800 dark:border-white/[0.2]"
              />
              원
            </div>
            <div className="text-right w-28">
              {(formatToEokUnit(TotalPrice) * value).toLocaleString()} 원
            </div>
          </div>
        )}
      </div>

      {characterInfoList.length !== 0 && (
        <div className="absolute right-3 top-4" />
      )}
    </ItemContainer>
  )
}

export default memo(GemSection)
