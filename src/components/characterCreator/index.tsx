import { useMainCharacterContext } from '@/context/characterContext'
import MainCharacterCard from './MainCharacterCard'
import SearchCharacter from './SearchCharacter'

const CharacterCreator = () => {
  const { mainCharacter } = useMainCharacterContext()

  if (mainCharacter === null) return <SearchCharacter />

  return <MainCharacterCard mainCharacter={mainCharacter} />
}

export default CharacterCreator
