import { STAT_KEY } from '@/constants/domain/characterStat'

export type StatKeyMap = typeof STAT_KEY

export type StatKeyEnglish = StatKeyMap[keyof StatKeyMap]

export type CharacterStats = Record<StatKeyEnglish, number>
