import BossImage from '@/commonComponents/BossImage'
import CharacterImage from '@/commonComponents/CharacterImage'
import {
  characterInfo,
  useCharacterInfoListContext,
} from '@/context/characterInfoListContext'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { memo, useEffect, useState } from 'react'

type WorldListType = {
  world: WorldType
  current: boolean
}

interface CharacterElementPropsType {
  character: characterInfo
  currentWorld: WorldListType | undefined
}

const CharacterElement = ({
  character,
  currentWorld,
}: CharacterElementPropsType) => {
  const { setCharacterInfoList } = useCharacterInfoListContext()
  const [currentBossList, setCurrentBossList] = useState<any[]>([])

  useEffect(() => {
    const arr: any[] = []
    character?.boss.forEach((boss) => {
      if (boss.type.filter((type) => type.current === true).length !== 0) {
        arr.push({
          name: boss.name,
          krName: boss.krName,
          difficulty: boss.type.find((type) => type.current === true)
            ?.difficulty,
        })
        setCurrentBossList(arr)
      } else if (arr.length === 0) {
        setCurrentBossList([])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character])

  if (currentWorld?.world !== character.world_name) return null

  const handleCharacter = () => {
    setCharacterInfoList((pre) =>
      pre.map((char) => {
        return {
          ...char,
          currentCharacter:
            char.ocid === character.ocid ? !char.currentCharacter : false,
        }
      }),
    )
  }

  const combatPower = formatKoreanNumber(character.final_stat[42].stat_value)

  const currentCss = character.currentCharacter ? 'bg-gray-200 ' : ''

  return (
    <div
      onClick={handleCharacter}
      onKeyDown={handleCharacter}
      tabIndex={0}
      role="button"
      className={` items-center flex ${currentCss} rounded-lg`}
    >
      <div className="flex items-center flex-col text-sm mr-4 w-24">
        <CharacterImage
          width={48}
          height={48}
          src={character.character_image}
        />
        {character.character_name}
      </div>
      <div className="h-fit w-32">
        <div>
          <div>LV. {character.character_level}</div>
        </div>
        <div>
          <div className="text-xs">{character.final_stat[42].stat_name}</div>
          <div>{combatPower}</div>
        </div>
      </div>
      <div className="flex gap-1">
        {currentBossList.map((boss) => {
          return (
            <div className="flex flex-col w-10 items-center" key={boss.name}>
              <BossImage boss={boss.name} />
              <div className="text-xs">{boss.difficulty}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(CharacterElement)
