import ItemContainer from '@/commonComponents/ItemContainer'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { memo } from 'react'

interface GemSectionPropsType {
  unit: '일반' | '유닛'
  unitHandler: React.MouseEventHandler<HTMLButtonElement>
}

const GemSection = ({ unit, unitHandler }: GemSectionPropsType) => {
  const { characterInfoList } = useCharacterInfoListContext()

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

  return (
    <ItemContainer title="결정석 판매 가격">
      <div className="flex relative">
        <div>
          {worldGemObject.map((world) => {
            return (
              <div key={world.name}>
                {world.name} :{' '}
                {unit === '유닛'
                  ? world.price.toLocaleString()
                  : formatKoreanNumber(world.price)}{' '}
                메소
              </div>
            )
          })}
        </div>
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
      </div>
    </ItemContainer>
  )
}

export default memo(GemSection)
