import ItemContainer from '@/commonComponents/ItemContainer'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { WorldType } from '@/type/character/world'
import { memo } from 'react'

const GemSection = () => {
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
      <div>
        {worldGemObject.map((world) => {
          return (
            <div key={world.name}>
              {world.name} : {world.price.toLocaleString()} 메소
            </div>
          )
        })}
      </div>
    </ItemContainer>
  )
}

export default memo(GemSection)
