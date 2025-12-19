'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CharacterFullInfo } from '@/types/api/character'
import type { ClearedBoss, JuboCharacter } from '@/types/storage/JubocCharacter'

const STORAGE_KEY = 'MAPLE_HELPER_JUBO_CHARACTERS_V1' as const

type AddCharacterResult =
  | { ok: true }
  | { ok: false; reason: 'LIMIT' | 'DUPLICATE' }

type AddBossResult =
  | { ok: true }
  | { ok: false; reason: 'CHARACTER_NOT_FOUND' | 'DUPLICATE_BOSS' }

interface JuboCharacterStore {
  characters: JuboCharacter[]

  selectedCharacter: string | null

  selectCharacter: (characterName: string) => void
  /** 캐릭터 추가 */
  addCharacter: (character: CharacterFullInfo) => AddCharacterResult

  /** 캐릭터 제거 */
  removeCharacter: (characterName: string) => void

  /** 캐릭터 업데이트 */
  updateCharacter: (
    characterName: string,
    updater: (prev: JuboCharacter) => JuboCharacter,
  ) => void

  /** 특정 캐릭터의 bosses 추가(중복 방지: bossId+difficulty) */
  setBossSelection: (characterName: string, boss: ClearedBoss) => AddBossResult

  replaceBossesByCharacterName: (
    characterName: string,
    bosses: ClearedBoss[],
  ) => void
  /** 전체 초기화 */
  clearAll: () => void
}

export const useJuboCharacterStore = create<JuboCharacterStore>()(
  persist(
    (set, get) => ({
      characters: [],
      selectedCharacter: null,

      selectCharacter: (characterName) => {
        set({
          selectedCharacter:
            characterName !== get().selectedCharacter ? characterName : null,
        })
      },

      addCharacter: (character) => {
        const { characters } = get()

        const exists = characters.some(
          (c) => c.characterName === character.userInfo.character_name,
        )
        if (exists) return { ok: false, reason: 'DUPLICATE' }

        set({
          characters: [
            ...characters,
            {
              characterName: character.userInfo.character_name,
              characterInfo: character,
              bosses: [],
            },
          ],
        })
        return { ok: true }
      },

      removeCharacter: (characterName) => {
        set((state) => ({
          characters: state.characters.filter(
            (c) => c.characterName !== characterName,
          ),
        }))
      },

      updateCharacter: (characterName, updater) => {
        set((state) => ({
          characters: state.characters.map((c) =>
            c.characterName === characterName ? updater(c) : c,
          ),
        }))
      },

      setBossSelection: (characterName: string, payload: ClearedBoss) => {
        const state = get()
        const target = state.characters.find(
          (c) => c.characterName === characterName,
        )
        if (!target)
          return { ok: false as const, reason: 'CHARACTER_NOT_FOUND' as const }

        set((state) => ({
          characters: state.characters.map((c) => {
            if (c.characterName !== characterName) return c

            if (payload.difficulty === null) {
              return {
                ...c,
                bosses: c.bosses.filter((b) => b.bossId !== payload.bossId),
              }
            }

            const idx = c.bosses.findIndex((b) => b.bossId === payload.bossId)

            if (idx === -1) {
              return {
                ...c,
                bosses: [
                  ...c.bosses,
                  {
                    bossId: payload.bossId,
                    difficulty: payload.difficulty,
                    partySize: payload.partySize,
                  },
                ],
              }
            }

            const prevBoss = c.bosses[idx]
            const nextBoss = {
              ...prevBoss,
              difficulty: payload.difficulty ?? prevBoss.difficulty,
              partySize: payload.partySize ?? prevBoss.partySize,
            }

            const nextBosses = [...c.bosses]
            nextBosses[idx] = nextBoss

            return { ...c, bosses: nextBosses }
          }),
        }))

        return { ok: true as const }
      },

      replaceBossesByCharacterName: (characterName, bosses) => {
        set((state) => ({
          characters: state.characters.map((c) =>
            c.characterName === characterName
              ? { ...c, bosses: bosses.map((b) => ({ ...b })) }
              : c,
          ),
        }))
      },

      clearAll: () => set({ characters: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ characters: state.characters }),
      version: 1,
    },
  ),
)
