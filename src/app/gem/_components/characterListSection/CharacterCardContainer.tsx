'use client'

import { WorldType } from '@/types/domain/game/worldtype'
import { JuboCharacter } from '@/types/storage/JubocCharacter'
import CharacterCard from './CharacterCard'

export interface Props {
  characters: JuboCharacter[]
  currentWorld: WorldType
  unit: '일반' | '유닛'
  simpleMode: boolean
}

const CharacterCardContainer = ({
  characters,
  currentWorld,
  unit,
  simpleMode,
}: Props) => {
  const filteredCharacters = characters.filter(
    (char) => char.characterInfo.userInfo.world_name === currentWorld,
  )

  return (
    <div className="p-1 h-fit w-full relative no-drag ">
      <div className="rounded-md mt-2 gap-2 flex flex-col dark:border-white/[0.05] dark:bg-white/[0.03]">
        {filteredCharacters.map((char) => (
          <CharacterCard
            simpleMode={simpleMode}
            key={char.characterInfo.ocid}
            unit={unit}
            character={char}
          />
        ))}
      </div>
    </div>
  )
}

export default CharacterCardContainer
