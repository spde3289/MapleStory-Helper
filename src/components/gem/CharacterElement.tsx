import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'

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
  return <div className="mr-6">{character.character_name}</div>
}

export default CharacterElement
