import { useMainCharacterContext } from '@/context/characterContext'
import SearchCharacter from './SearchCharacter'
import MainCharacterCard from './MainCharacterCard'

const CharacterCreator = () => {
  const { mainCharacter } = useMainCharacterContext()

  if (mainCharacter === null) return <SearchCharacter />

  return <MainCharacterCard mainCharacter={mainCharacter} />
}

export default CharacterCreator
