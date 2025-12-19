'use client'

import MainCharacterProvider from '@/context/characterContext'

/** 전역상태관리 Provider */
const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  return <MainCharacterProvider>{children}</MainCharacterProvider>
}

export default GlobalStateProvider
