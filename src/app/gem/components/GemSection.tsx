import ItemContainer from '@/components/ItemContainer'
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
      className="relative gem-virtual-text-area "
      title="결정석 판매 가격"
    >
      <div className="flex relative pt-4">
        <div className="flex items-center">
          <div className="mr-4 xxxs:gap-4 xxxs:w-full">
            {worldGemObject.map((world) => {
              return (
                <div key={world.name} className="flex justify-between">
                  <div key={world.name} className="">
                    {world.name} :{' '}
                    {unit === '유닛'
                      ? world.price.toLocaleString()
                      : formatKoreanNumber(world.price)}{' '}
                    메소
                  </div>
                  <div
                    className={`ml-4 ${world.count > maxGem ? 'text-red-600' : ''}`}
                  >
                    {world.count} / {maxGem}{' '}
                  </div>
                </div>
              )
            })}
          </div>
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
          <div className="absolute right-3 xxxs:-top-10 xxxs:right-0">
            <button
              className="px-2 bg-gray-200 rounded-xl "
              onClick={unitHandler}
              value={unit}
              type="button"
            >
              {unit}
            </button>
          </div>
        )}
      </div>
    </ItemContainer>
  )
}

export default memo(GemSection)
