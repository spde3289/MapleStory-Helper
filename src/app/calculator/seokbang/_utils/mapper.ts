export type BossTraceGroup = {
  bossId: string
  bossName: string
  player: number
  difficulties: {
    difficulty: string
    trace: number
  }[]
}

export type BossTypeRow = {
  difficulty: string
  reward: number
  current: boolean
}

export type BossRow = {
  name: { name: string; krName: string }
  type: BossTypeRow[]
  player: { current: number; max: number }
}

export const mapBossTraceGroupToBossRows = (
  list: BossTraceGroup[],
): BossRow[] => {
  return list.map((boss) => ({
    name: {
      name: boss.bossId,
      krName: boss.bossName,
    },
    player: { current: 1, max: boss.player },
    type: boss.difficulties.map((difficulty) => ({
      difficulty: difficulty.difficulty,
      reward: difficulty.trace,
      current: false, // 초기 선택 상태
    })),
  }))
}

type BossTraceRow = {
  bossId: string
  bossName: string
  difficulty: string
  trace: number
}

export const mapAndSortBossTraces = (
  list: BossTraceGroup[],
): BossTraceRow[] => {
  return list
    .flatMap((boss) =>
      boss.difficulties.map((d) => ({
        bossId: boss.bossId,
        bossName: boss.bossName,
        difficulty: d.difficulty,
        trace: d.trace,
      })),
    )
    .sort((a, b) => a.trace - b.trace)
}
