// 'use client'

// import type { StoredJubocCharacter } from '@/types/storage/JubocCharacter'

// const KEY = 'MAPLE_HELPER_JUBOC_V2'

// export const jubocStorage = {
//   get: (): StoredJubocCharacter[] => {
//     const raw = localStorage.getItem(KEY)
//     return raw ? (JSON.parse(raw) as StoredJubocCharacter[]) : []
//   },
//   set: (value: StoredJubocCharacter[]) => {
//     localStorage.setItem(KEY, JSON.stringify(value))
//   },
// } as const
