'use client'

import WorldImage from '@/components/common/WorldImage'
import Button from '@/components/ui/button/Button'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { BossType } from '@/data/boss'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import {
  ChangeEvent,
  ChangeEventHandler,
  useMemo,
  useReducer,
  useState,
} from 'react'

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
  currentValue: boolean
  handlerCurrentValue: (e: ChangeEvent<HTMLInputElement>) => void
  worldList: WorldListType[]
  unit: '일반' | '유닛'
  handleWorldChange: (world: WorldListType) => void
}

type SortKey = 'level' | 'combatPower'
type SortOrder = 'asc' | 'desc'

interface SortState {
  key: SortKey
  order: SortOrder
}

type SortAction =
  | { type: 'SET_KEY'; payload: SortKey }
  | { type: 'TOGGLE_ORDER' }

const sortReducer = (state: SortState, action: SortAction): SortState => {
  switch (action.type) {
    case 'SET_KEY':
      if (state.key === action.payload) {
        return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' }
      }
      return { key: action.payload, order: 'desc' }
    case 'TOGGLE_ORDER':
      return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' }
    default:
      return state
  }
}

const CharacterContainer = ({
  currentValue,
  handlerCurrentValue,
  worldList,
  unit,
  handleWorldChange,
}: characterNamePropsType) => {
  const [simpleMode, setSimpleMode] = useState(false)
  const { characterInfoList } = useCharacterInfoListContext()

  const [sortState, dispatch] = useReducer(sortReducer, {
    key: 'level',
    order: 'desc',
  })

  const SimpleModehandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSimpleMode(e.currentTarget.checked)
  }

  const sortedCharacterList = useMemo(() => {
    const copied = [...characterInfoList]
    const { key, order } = sortState
    const base = order === 'asc' ? 1 : -1

    return copied.sort((a, b) => {
      const aValue =
        key === 'level'
          ? a.character_level
          : (a.final_stat?.[42]?.stat_value ?? 0)
      const bValue =
        key === 'level'
          ? b.character_level
          : (b.final_stat?.[42]?.stat_value ?? 0)

      if (aValue > bValue) return base
      if (aValue < bValue) return -base
      return 0
    })
  }, [characterInfoList, sortState])

  return (
    <div className="p-1 h-fit w-full relative no-drag ">
      <div className="w-full flex flex-col gap-2 justify-between ">
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
        <div className="flex gap-2 justify-between px-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_KEY', payload: 'level' })}
              className="w-[42px] text-sm text-start hover:underline"
            >
              레벨{' '}
              {sortState.key === 'level' &&
                (sortState.order === 'asc' ? '▲' : '▼')}
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: 'SET_KEY', payload: 'combatPower' })
              }
              className="w-14 text-sm text-start hover:underline"
            >
              전투력{' '}
              {sortState.key === 'combatPower' &&
                (sortState.order === 'asc' ? '▲' : '▼')}
            </button>
          </div>
          <label
            className="flex items-center text-nowrap gap-1 hover:cursor-pointer hover:text-gray-600 dark:hover:text-gray-400"
            htmlFor="결정석 패치후"
          >
            <input
              onChange={handlerCurrentValue}
              checked={currentValue}
              className="hover:cursor-pointer"
              type="checkbox"
              id="결정석 패치후"
            />
            결정석 패치후
          </label>
          <label
            className="flex items-center text-nowrap gap-1 hover:cursor-pointer hover:text-gray-600 dark:hover:text-gray-400"
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
      </div>
      <div className="rounded-md mt-2 gap-2 flex flex-col dark:border-white/[0.05] dark:bg-white/[0.03]">
        {sortedCharacterList.map((char) => {
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
