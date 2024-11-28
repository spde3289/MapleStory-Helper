import ItemContainer from '@/commonComponents/ItemContainer'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber, formatToEokUnit } from '@/utils/numberUtils'
import { memo, useState } from 'react'

interface GemSectionPropsType {
  unit: '일반' | '유닛'
  unitHandler: React.MouseEventHandler<HTMLButtonElement>
}

const GemSection = ({ unit, unitHandler }: GemSectionPropsType) => {
  const { characterInfoList } = useCharacterInfoListContext()
  const [value, setValue] = useState<number>(0)

  const uniqueWorldNames = Array.from(
    new Set(characterInfoList.map((character) => character.world_name)),
  )

  type worldGemObjectType = {
    name: WorldType
    price: number
  }[]

  const worldGemObject: worldGemObjectType = uniqueWorldNames.map((world) => {
    return {
      name: world,
      price: 0,
    }
  })

  const addPrice = (
    Object: worldGemObjectType,
    name: string,
    amount: number,
  ) => {
    const targetWorld = Object.find((world) => world.name === name)
    if (targetWorld) {
      targetWorld.price += amount
    }
  }

  characterInfoList.forEach((el) => {
    el.boss.forEach((boss) => {
      const currentBoss = boss.type.find((type) => type.current === true)
      if (currentBoss !== undefined) {
        worldGemObject.forEach((world) => {
          if (world.name === el.world_name) {
            addPrice(
              worldGemObject,
              el.world_name,
              Math.floor(currentBoss.price / boss.player),
            )
          }
        })
      }
    })
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
    <ItemContainer title="결정석 판매 가격">
      <div className="flex relative">
        <div className="flex items-center">
          <div className="mr-4">
            {worldGemObject.map((world) => {
              return (
                <div key={world.name} className="">
                  {world.name} :{' '}
                  {unit === '유닛'
                    ? world.price.toLocaleString()
                    : formatKoreanNumber(world.price)}{' '}
                  메소
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
          <div className="">
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
          <div className="absolute right-3">
            <button
              className="px-2 bg-gray-200 rounded-xl right-2"
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
