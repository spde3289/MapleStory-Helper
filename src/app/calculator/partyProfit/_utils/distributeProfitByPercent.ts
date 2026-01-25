export type DistributionResult = {
  id: string
  name: string
  ratio: number
  amount: number
}

type Member = { id: string; name: string; ratio: number }
type Mode = 'MANUAL' | 'EQUAL'

export const distributeProfitByPercent = (
  totalProfit: number,
  feeRate: number,
  members: Member[],
  mode: Mode,
) => {
  const memberCount = members.length

  const fee = memberCount >= 2 ? Math.floor((totalProfit * feeRate) / 100) : 0
  const distributable = totalProfit - fee

  const results: DistributionResult[] = members.map((m) => ({
    ...m,
    amount:
      mode === 'MANUAL'
        ? Math.floor((distributable * m.ratio) / 100)
        : Math.floor(distributable / memberCount),
  }))

  const distributed = results.reduce((sum, r) => sum + r.amount, 0)
  const remainder = distributable - distributed

  return { results, remainder }
}
