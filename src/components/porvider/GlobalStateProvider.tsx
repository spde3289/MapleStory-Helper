'use client'

import MainCharacterProvider from '@/context/characterContext'
import CharacterInfoListProvider from '@/context/characterInfoListContext'

/** 전역상태관리 Provider */
const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CharacterInfoListProvider>
      <MainCharacterProvider>{children}</MainCharacterProvider>
    </CharacterInfoListProvider>
  )
}

export default GlobalStateProvider
