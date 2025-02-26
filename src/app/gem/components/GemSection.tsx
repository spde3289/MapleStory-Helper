import ItemContainer from '@/components/common/ItemContainer'
import WorldImage from '@/components/common/WorldImage'
import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { formatKoreanNumber, formatToEokUnit } from '@/utils/numberUtils'
import { memo, useState } from 'react'

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
    (info) => info.character_name === '완강식',
  )

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '') // 숫자만 허용
    if (inputValue.length <= 5) {
      // 5자리로 제한
      setValue(Number(inputValue))
    }
  }

  return (
    <ItemContainer
      className="relative gem-virtual-text-area lg:min-w-72"
      title="결정석 판매 가격"
    >
      <div className="flex relative pt-4">
        <div className="flex flex-col w-full">
          {worldGemObject.map((world) => {
            return (
              <div
                key={world.name}
                className="flex justify-between border-b p-2"
              >
                <span className="flex gap-1 h-fit">
                  <WorldImage world_name={world.name} size={24} />
                  {world.name}
                </span>
                <span className="flex gap-2 flex-col text-right">
                  <span
                    className={`${world.count > maxGem ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {world.count}{' '}
                    <span className="text-gray-900 dark:text-white/90">
                      / {maxGem}
                    </span>
                  </span>
                  <span key={world.name} className="">
                    {unit === '유닛'
                      ? Math.floor(world.price).toLocaleString()
                      : formatKoreanNumber(Math.floor(world.price))}{' '}
                    메소
                  </span>
                </span>
              </div>
            )
          })}
          {hidden && (
            <div className="flex h-fit mr-4">
              X
              <input
                onChange={inputHandler}
                value={value}
                className="bg-gray-200 rounded-lg outline-none w-20 p-2 h-7 ml-2"
              />
              원
            </div>
          )}
          <div className="w-fit whitespace-nowrap ">
            {hidden &&
              worldGemObject.map((world) => {
                return (
                  <div key={world.name} className="text-right">
                    {(formatToEokUnit(world.price) * value).toLocaleString()} 원
                  </div>
                )
              })}
          </div>
        </div>
        {characterInfoList.length !== 0 && (
          <div className="absolute right-3 -top-10">
            <Button onClick={unitHandler}>{unit}</Button>
          </div>
        )}
      </div>
    </ItemContainer>
  )
}

export default memo(GemSection)
