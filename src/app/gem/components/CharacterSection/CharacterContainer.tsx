import WorldImage from '@/components/common/WorldImage'
import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { BossType } from '@/data/boss'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import { ChangeEventHandler, useState } from 'react'

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
  const [simpleMode, setSimpleMode] = useState(false)
  const { characterInfoList } = useCharacterInfoListContext()

  const SimpleModehandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSimpleMode(e.currentTarget.checked)
  }

  return (
    <div className="p-1 h-fit w-full relative no-drag ">
      <div className="w-full flex gap-2 justify-between">
        <div className="flex overflow-y-scroll scrollBar gap-2">
          {worldList.map((world) => {
            return (
              <Button
                key={world.world}
                size="md"
                className={`${world.current ? ' bg-orange-400 rounded-md' : ''} w-max flex items-center gap-2 whitespace-nowrap `}
                onClick={() => handleWorldChange(world)}
              >
                <WorldImage world_name={world.world} size={20} />
                {world.world}
              </Button>
            )
          })}
        </div>
        <label
          className="flex items-center w-fit text-nowrap gap-1 hover:cursor-pointer hover:text-gray-600 dark:hover:text-gray-400"
          htmlFor="간단모드"
        >
          <input
            onChange={SimpleModehandler}
            checked={simpleMode}
            className="hover:cursor-pointer"
            type="checkbox"
            id="간단모드"
          />
          간단모드
        </label>
      </div>

      <div className="rounded-md mt-2 gap-2 flex flex-col dark:border-white/[0.05] dark:bg-white/[0.03]">
        {characterInfoList.map((char) => {
          return (
            <CharacterElement
              simpleMode={simpleMode}
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
