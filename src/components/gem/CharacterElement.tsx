import CharacterImage from '@/commonComponents/CharacterImage'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import { formatKoreanNumber } from '@/utils/numberUtils'
import { memo } from 'react'

type WorldListType = {
  world: WorldType
  current: boolean
}

interface CharacterElementPropsType {
  character: MainCharacterResponse
  currentWorld: WorldListType | undefined
}

const CharacterElement = ({
  character,
  currentWorld,
}: CharacterElementPropsType) => {
  if (currentWorld?.world !== character.world_name) return null

  const combatPower = formatKoreanNumber(character.final_stat[42].stat_value)

  return (
    <div className="mr-6 items-center flex">
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
