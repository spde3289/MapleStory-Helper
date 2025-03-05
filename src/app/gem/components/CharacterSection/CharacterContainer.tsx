import WorldImage from '@/components/common/WorldImage'
import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { BossType } from '@/data/boss'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'

import CharacterElement from './CharacterElement'

export interface characterInfo extends MainCharacterResponse {
  currentCharacter: boolean
  boss: BossType
}

type WorldListType = {
  world: WorldType
  current: boolean
}

export interface characterNamePropsType {
  worldList: WorldListType[]
  unit: '일반' | '유닛'
  handleWorldChange: (world: WorldListType) => void
}

const CharacterContainer = ({
  worldList,
  unit,
  handleWorldChange,
}: characterNamePropsType) => {
  const { characterInfoList } = useCharacterInfoListContext()
  return (
    <div className="p-1 h-fit w-full relative no-drag ">
      <div className="absolute w-full flex overflow-y-scroll scrollBar gap-2">
        {worldList.map((world) => {
          return (
            <Button
              key={world.world}
              size="md"
              className={`${world.current ? ' bg-orange-400 rounded-md' : ''} flex items-center gap-2 whitespace-nowrap `}
              onClick={() => handleWorldChange(world)}
            >
              <WorldImage world_name={world.world} size={20} />
              {world.world}
            </Button>
          )
        })}
      </div>
      <div className="rounded-md mt-11 gap-2 flex flex-col dark:border-white/[0.05] dark:bg-white/[0.03]">
        {characterInfoList.map((char) => {
          return (
            <CharacterElement
              key={char.ocid}
              unit={unit}
              currentWorld={worldList.find((world) => world.current)}
              character={char}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CharacterContainer
