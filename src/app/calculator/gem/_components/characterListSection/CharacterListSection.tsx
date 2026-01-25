import ItemContainer from '@/components/common/ItemContainer'
import WorldImage from '@/components/common/WorldImage'
import Button from '@/components/ui/Button'
import { useSubmitInput } from '@/hooks/useSubmitInput'
import {
  fetchCharacter,
  fetchCharacters,
  fetchCharactersByNames,
} from '@/lib/client/charactersClient'
import { useJuboCharacterStore } from '@/stores/useJubocCharacter'
import { WorldType } from '@/types/domain/world'
import Link from 'next/link'
import { ChangeEventHandler, memo, useMemo, useReducer, useState } from 'react'
import useWorldSelector from '../../_hooks/useWorldsSelector'
import CharacterCardContainer from './CharacterCardContainer'

type WorldListType = {
  name: WorldType
  current: boolean
}

export interface characterNamePropsType {
  worldList: WorldListType[]
  unit: '일반' | '유닛'
  handleWorldChange: (world: WorldListType) => void
}

type SortKey = 'level' | 'combatPower'
type SortOrder = 'asc' | 'desc'

export interface SortState {
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

interface Props {
  unit: '일반' | '유닛'
}

const CharacterListSection = ({ unit }: Props) => {
  const characters = useJuboCharacterStore((s) => s.characters)
  const addCharacter = useJuboCharacterStore((s) => s.addCharacter)
  const updateCharacter = useJuboCharacterStore((s) => s.updateCharacter)

  const { worlds, selectWorld, currentWorld } = useWorldSelector(characters)
  const { inputValue, handleChange, handleKeyDown } = useSubmitInput({
    onSubmit: (value) => {
      if (value.length <= 12) {
        fetchCharacter(value).then((res) => addCharacter(res))
      } else {
        fetchCharacters(value, { minLevel: 220, minPower: 5000000 }).then(
          (res) => res.success.forEach((char) => addCharacter(char)),
        )
      }
    },
  })
  const [simpleMode, setSimpleMode] = useState(false)

  const [sortState, dispatch] = useReducer(sortReducer, {
    key: 'level',
    order: 'desc',
  })

  const SimpleModehandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSimpleMode(e.currentTarget.checked)
  }

  const handleRefresh = async () => {
    const charNameList = characters.map((char) => char.characterName)

    const data = await fetchCharactersByNames(charNameList)

    data.success.forEach((char) =>
      updateCharacter(char.userInfo.character_name, char),
    )

    data.errors.forEach((err) =>
      alert(`캐릭터 이름 : ${err.payload?.characterName} - ${err.message}`),
    )
  }

  const sortedCharacters = useMemo(() => {
    const arr = [...characters]
    return arr.sort((a, b) => {
      const av =
        sortState.key === 'combatPower'
          ? a.characterInfo.userStat.combat_power
          : a.characterInfo.userInfo.character_level
      const bv =
        sortState.key === 'combatPower'
          ? b.characterInfo.userStat.combat_power
          : b.characterInfo.userInfo.character_level
      return sortState.order === 'asc' ? av - bv : bv - av
    })
  }, [characters, sortState])

  return (
    <ItemContainer className="relative" title="캐릭터 등록">
      <div className="w-full md:w-[300px]">
        <div className="absolute top-3 right-4 underline">
          <Link
            target="_blank"
            href="https://openapi.nexon.com/ko/guide/prepare-in-advance/"
          >
            API KEY 발급
          </Link>
        </div>
        <input
          id="캐릭터등록"
          className="h-8 p-3 border w-full rounded-lg outline-none bg-gray-100 dark:bg-gray-800 mb-2 dark:border-white/[0.2]"
          placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-col gap-2 justify-between overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {worlds.map((world) => {
              return (
                <Button
                  key={world.name}
                  size="sm"
                  className={`${world.current ? ' bg-orange-500 text-gray-200 rounded-md ' : ''} h-full flex items-center gap-2 whitespace-nowrap `}
                  onClick={() => selectWorld(world.name)}
                >
                  <WorldImage worldName={world.name} size={20} />
                  {world.name}
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
            <div className="flex gap-3">
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
              <Button size="sm" onClick={handleRefresh}>
                {' '}
                새로고침
              </Button>
            </div>
          </div>
        </div>
        <CharacterCardContainer
          characters={sortedCharacters}
          currentWorld={currentWorld}
          unit={unit}
          simpleMode={simpleMode}
        />
      </div>
    </ItemContainer>
  )
}

export default memo(CharacterListSection)
