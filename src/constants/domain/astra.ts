import { BossTraceGroup, DailyQuestFragment } from '@/types/domain/astra'

export const BOSS_TRACE_GROUP_LIST: BossTraceGroup[] = [
  {
    bossId: 'ChosenSeren',
    bossName: '선택받은 세렌',
    player: 6,
    difficulties: [
      { difficulty: 'NORMAL', trace: 6 },
      { difficulty: 'HARD', trace: 30 },
      { difficulty: 'EXTREME', trace: 180 },
    ],
  },
  {
    bossId: 'KalostheGuardian',
    bossName: '감시자 칼로스',
    player: 6,
    difficulties: [
      { difficulty: 'EASY', trace: 6 },
      { difficulty: 'NORMAL', trace: 20 },
      { difficulty: 'CHAOS', trace: 100 },
      { difficulty: 'EXTREME', trace: 500 },
    ],
  },
  {
    bossId: 'TheFirstAdversary',
    bossName: '최초의 대적자',
    player: 3,
    difficulties: [
      { difficulty: 'EASY', trace: 10 },
      { difficulty: 'NORMAL', trace: 40 },
      { difficulty: 'HARD', trace: 180 },
      { difficulty: 'EXTREME', trace: 540 },
    ],
  },
  {
    bossId: 'Kaling',
    bossName: '카링',
    player: 6,
    difficulties: [
      { difficulty: 'EASY', trace: 15 },
      { difficulty: 'NORMAL', trace: 80 },
      { difficulty: 'HARD', trace: 240 },
      { difficulty: 'EXTREME', trace: 1440 },
    ],
  },
  {
    bossId: 'RadiantMalefic',
    bossName: '찬란한 흉성',
    player: 3,
    difficulties: [
      { difficulty: 'NORMAL', trace: 60 },
      { difficulty: 'HARD', trace: 240 },
    ],
  },
  {
    bossId: 'Limbo',
    bossName: '림보',
    player: 3,
    difficulties: [
      { difficulty: 'NORMAL', trace: 80 },
      { difficulty: 'HARD', trace: 240 },
    ],
  },
  {
    bossId: 'Baldrix',
    bossName: '발드릭스',
    player: 3,
    difficulties: [
      { difficulty: 'NORMAL', trace: 80 },
      { difficulty: 'HARD', trace: 240 },
    ],
  },
]

export const DAILY_QUEST_FRAGMENT_LIST: DailyQuestFragment[] = [
  { area: '탈라하트', level: 290, fragment: 45 },
  { area: '카르시온', level: 285, fragment: 25 },
  { area: '아르테리아', level: 280, fragment: 15 },
  { area: '도원경', level: 275, fragment: 10 },
  { area: '오디움', level: 270, fragment: 6 },
  { area: '호텔', level: 265, fragment: 3 },
  { area: '세르니움', level: 260, fragment: 1 },
]

export const QUEST_SUCCESS_REQUIREMENTS = [
  { name: '1차 성장', trace: 600, fragment: 3000 },
  { name: '2차 성장', trace: 600, fragment: 3000 },
  { name: '최종 성장', trace: 800, fragment: 4000 },
]
