'use client'

import CharacterImage from '@/components/common/CharacterImage'
import ItemContainer from '@/components/common/ItemContainer'
import WorldImage from '@/components/common/WorldImage'
import { useMainCharacterContext } from '@/context/characterContext'
import { removeCharacterName } from '@/utils/localStorage/characterName'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import SearchCharacter from './SearchCharacter'

function CharacterCreator() {
  const { mainCharacter, setMainCharacter } = useMainCharacterContext()
  const { toggleTheme } = useTheme()

  if (mainCharacter === null) return <SearchCharacter />

  return (
    <ItemContainer title="대표 캐릭터">
      <div className="w-40 h-full bg-white flex flex-col items-center rounded-xl">
        <div className="relative w-32 h-32 mb-2 bg-gray-300 rounded-full">
          <CharacterImage src={mainCharacter?.character_image} />
        </div>
        <div className="text-center">{mainCharacter.character_name}</div>
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-1 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
            <WorldImage world_name={mainCharacter.world_name} />
            {mainCharacter.world_name}
          </div>
          <div>{mainCharacter.character_guild_name}</div>
        </div>
        <div className="flex gap-10 mt-3">
          <button
            type="button"
            onClick={() => {
              setMainCharacter(null)
              removeCharacterName()
            }}
            className="relative hover:after:content-['삭제'] after:absolute after:w-12 after:-translate-x-1/2 after:left-1/2 after:top-10 after:bg-gray-700 after:text-white after:text-sm hover:after:px-2 hover:after:py-1 after:rounded-md"
          >
            <FaRegTrashAlt className="text-red-700" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        dasdasdas
      </button>
    </ItemContainer>
  )
}

export default CharacterCreator
