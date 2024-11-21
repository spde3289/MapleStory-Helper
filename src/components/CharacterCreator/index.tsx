import CharacterImage from '@/commonComponents/CharacterImage'
import ItemContainer from '@/commonComponents/ItemContainer'
import WorldImage from '@/commonComponents/WorldImage'
import { useMainCharacterContext } from '@/context/characterContext'
import { deleteCookie } from 'cookies-next'
import { FaRegTrashAlt } from 'react-icons/fa'
import SearchCharacter from './SearchCharacter'

const CharacterCreator = () => {
  const { mainCharacter, setMainCharacter } = useMainCharacterContext()

  if (mainCharacter === null) return <SearchCharacter />

  return (
    <ItemContainer title="대표 캐릭터">
      <div className="w-40 h-full bg-white flex flex-col items-center rounded-xl">
        <div className="relative w-32 h-32 mb-2 bg-gray-300 rounded-full">
          <CharacterImage src={mainCharacter?.character_image} />
        </div>
        <div className="text-center">{mainCharacter.character_name}</div>
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-1">
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
              deleteCookie('ocid')
            }}
            className="relative hover:after:content-['삭제'] after:absolute after:w-12 after:-translate-x-1/2 after:left-1/2 after:top-10 after:bg-gray-700 after:text-white after:text-sm hover:after:px-2 hover:after:py-1 after:rounded-md"
          >
            <FaRegTrashAlt className="text-red-700" />
          </button>
        </div>
      </div>
    </ItemContainer>
  )
}

export default CharacterCreator
