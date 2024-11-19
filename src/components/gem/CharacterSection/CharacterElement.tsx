import CharacterImage from '@/commonComponents/CharacterImage'
import {
  characterInfo,
  useCharacterInfoListContext,
} from '@/context/characterInfoListContext'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { memo } from 'react'

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
      className={`mr-6 items-center flex ${currentCss} rounded-lg`}
    >
      <div className="flex items-center flex-col text-sm mr-4 w-24">
        <CharacterImage
          width={48}
          height={48}
          src={character.character_image}
        />
        {character.character_name}
      </div>
      <div className="h-fit w-36">
        <div className="text-xs">{character.final_stat[42].stat_name}</div>
        <div>{combatPower}</div>
      </div>
    </div>
  )
}

export default memo(CharacterElement)
