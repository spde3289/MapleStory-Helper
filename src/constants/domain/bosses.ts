export const BOSSES = [
  {
    bossId: 'Zakum',
    bossName: '자쿰',
    difficulties: [{ difficulty: '카오스', price: 8080000 }],
  },
  {
    bossId: 'Magnus',
    bossName: '매그너스',
    difficulties: [{ difficulty: '하드', price: 8560000 }],
  },
  {
    bossId: 'Hilla',
    bossName: '힐라',
    difficulties: [{ difficulty: '하드', price: 5750000 }],
  },
  {
    bossId: 'Papulatus',
    bossName: '파풀라투스',
    difficulties: [{ difficulty: '카오스', price: 13800000 }],
  },
  {
    bossId: 'Pierre',
    bossName: '피에르',
    difficulties: [{ difficulty: '카오스', price: 8170000 }],
  },
  {
    bossId: 'BanBan',
    bossName: '반반',
    difficulties: [{ difficulty: '카오스', price: 8150000 }],
  },
  {
    bossId: 'BloodyQueen',
    bossName: '블러디퀸',
    difficulties: [{ difficulty: '카오스', price: 8140000 }],
  },
  {
    bossId: 'Vellum',
    bossName: '벨룸',
    difficulties: [{ difficulty: '카오스', price: 9280000 }],
  },
  {
    bossId: 'PinkBean',
    bossName: '핑크빈',
    difficulties: [{ difficulty: '카오스', price: 6580000 }],
  },
  {
    bossId: 'Cygnus',
    bossName: '시그너스',
    difficulties: [
      { difficulty: '이지', price: 4550000 },
      { difficulty: '노멀', price: 7500000 },
    ],
  },
  {
    bossId: 'Lotus',
    bossName: '스우',
    difficulties: [
      { difficulty: '노멀', price: 17600000 },
      { difficulty: '하드', price: 54200000 },
      { difficulty: '익스트림', price: 604000000 },
    ],
  },
  {
    bossId: 'Damien',
    bossName: '데미안',
    difficulties: [
      { difficulty: '노멀', price: 18400000 },
      { difficulty: '하드', price: 51500000 },
    ],
  },
  {
    bossId: 'GuardianAngelSlime',
    bossName: '가디언 엔젤 슬라임',
    difficulties: [
      { difficulty: '노멀', price: 26800000 },
      { difficulty: '카오스', price: 79100000 },
    ],
  },
  {
    bossId: 'Lucid',
    bossName: '루시드',
    difficulties: [
      { difficulty: '이지', price: 31400000 },
      { difficulty: '노멀', price: 37500000 },
      { difficulty: '하드', price: 66200000 },
    ],
  },
  {
    bossId: 'Will',
    bossName: '윌',
    difficulties: [
      { difficulty: '이지', price: 34000000 },
      { difficulty: '노멀', price: 43300000 },
      { difficulty: '하드', price: 81200000 },
    ],
  },
  {
    bossId: 'GiantMonsterGloom',
    bossName: '더스크',
    difficulties: [
      { difficulty: '노멀', price: 46300000 },
      { difficulty: '카오스', price: 73500000 },
    ],
  },
  {
    bossId: 'VerusHilla',
    bossName: '진 힐라',
    difficulties: [
      { difficulty: '노멀', price: 74900000 },
      { difficulty: '하드', price: 112000000 },
    ],
  },
  {
    bossId: 'GuardCaptainDarknell',
    bossName: '듄켈',
    difficulties: [
      { difficulty: '노멀', price: 50000000 },
      { difficulty: '하드', price: 99400000 },
    ],
  },
  {
    bossId: 'ChosenSeren',
    bossName: '선택받은 세렌',
    difficulties: [
      { difficulty: '노멀', price: 266000000 },
      { difficulty: '하드', price: 396000000 },
      { difficulty: '익스트림', price: 3150000000 },
    ],
  },
  {
    bossId: 'KalostheGuardian',
    bossName: '감시자 칼로스',
    difficulties: [
      { difficulty: '이지', price: 311000000 },
      { difficulty: '노멀', price: 561000000 },
      { difficulty: '카오스', price: 1340000000 },
      { difficulty: '익스트림', price: 4320000000 },
    ],
  },
  {
    bossId: 'TheFirstAdversary',
    bossName: '최초의 대적자',
    difficulties: [
      { difficulty: '이지', price: 324000000 },
      { difficulty: '노멀', price: 589000000 },
      { difficulty: '하드', price: 1510000000 },
      { difficulty: '익스트림', price: 4960000000 },
    ],
  },
  {
    bossId: 'Kaling',
    bossName: '카링',
    difficulties: [
      { difficulty: '이지', price: 419000000 },
      { difficulty: '노멀', price: 714000000 },
      { difficulty: '하드', price: 1830000000 },
      { difficulty: '익스트림', price: 5670000000 },
    ],
  },
  {
    bossId: 'Limbo',
    bossName: '림보',
    difficulties: [
      { difficulty: '노멀', price: 1080000000 },
      { difficulty: '하드', price: 2510000000 },
    ],
  },
  {
    bossId: 'Baldrix',
    bossName: '발드릭스',
    difficulties: [
      { difficulty: '노멀', price: 1440000000 },
      { difficulty: '하드', price: 3240000000 },
    ],
  },
] as const

export type BossId = (typeof BOSSES)[number]['bossId']
