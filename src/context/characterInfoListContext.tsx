import BossInfo from '@/data/boss/boss.json'
import { MainCharacterResponse } from '@/type/axios/characterType'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface characterInfo extends MainCharacterResponse {
  currentCharacter: boolean
  boss: {
    krName: string
    name: string
    type: {
      difficulty: string
      price: number
      current: boolean
    }[]
  }[]
}

interface CharacterInfoListContextType {
  characterInfoList: characterInfo[]
  handleCharacterInfo: (
    data: MainCharacterResponse | MainCharacterResponse[],
  ) => void
  setCharacterInfoList: Dispatch<SetStateAction<characterInfo[]>>
}

const CharacterInfoListContext =
  createContext<CharacterInfoListContextType | null>(null)

const CharacterInfoListProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [characterInfoList, setCharacterInfoList] = useState<characterInfo[]>(
    [],
  )

  const handleCharacterInfo = useCallback(
    (data: MainCharacterResponse | MainCharacterResponse[]) => {
      if (Array.isArray(data)) {
        const mapingData = data.map((char) => {
          return {
            ...char,
            currentCharacter: false,
            boss: BossInfo,
          }
        })
        setCharacterInfoList((pre) => [...pre, ...mapingData])
      } else {
        setCharacterInfoList((pre) => [
          ...pre,
          { ...data, currentCharacter: false, boss: BossInfo },
        ])
      }
    },
    [],
  )

  const value = useMemo(
    () => ({ characterInfoList, handleCharacterInfo, setCharacterInfoList }),
    [characterInfoList, handleCharacterInfo, setCharacterInfoList],
  )

  return (
    <CharacterInfoListContext.Provider value={value}>
      {children}
    </CharacterInfoListContext.Provider>
  )
}

export const useCharacterInfoListContext = () => {
  const context = useContext(CharacterInfoListContext)
  if (!context) {
    throw new Error(
      'useMainCharacterContext must be used within a MainCharacterProvider',
    )
  }
  return context // Context의 값을 반환
}

export default CharacterInfoListProvider
