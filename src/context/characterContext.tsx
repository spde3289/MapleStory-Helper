'use client'

import { MainCharacterResponse } from '@/type/axios/characterType'
import { createContext, useContext, useMemo, useState } from 'react'

interface MainCharacterContextType {
  mainCharacter: MainCharacterResponse | null
  setMainCharacter: (newValue: MainCharacterResponse | null) => void
}

const MainCharacterContext = createContext<null | MainCharacterContextType>(
  null,
)

const MainCharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mainCharacter, setMainCharacter] =
    useState<MainCharacterResponse | null>(null)

  // value 객체를 useMemo로 메모이제이션
  const value = useMemo(
    () => ({ mainCharacter, setMainCharacter }),
    [mainCharacter],
  )

  return (
    <MainCharacterContext.Provider value={value}>
      {children}
    </MainCharacterContext.Provider>
  )
}

export const useMainCharacterContext = () => {
  const context = useContext(MainCharacterContext)
  if (!context) {
    throw new Error(
      'useMainCharacterContext must be used within a MainCharacterProvider',
    )
  }
  return context
}

export default MainCharacterProvider
