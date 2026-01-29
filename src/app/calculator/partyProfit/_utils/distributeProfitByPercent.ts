export type DistributionResult = {
  id: string
  name: string
  ratio: number
  transferAmount: number // 입력 금액 (송금액)
  finalReceivedAmount: number // 실수령액
}

type Member = { id: string; name: string; ratio: number }
type Mode = 'MANUAL' | 'EQUAL'

const normalizeMembers = (members: Member[], mode: Mode): Member[] => {
  if (mode === 'EQUAL') {
    const equalRatio = 100 / members.length
    return members.map((m) => ({ ...m, ratio: equalRatio }))
  }
  return members
}

const calculateFairBaseProfit = (
  totalProfit: number,
  ownerRatio: number,
  feeRate: number,
): number => {
  const r = feeRate / 100
  const wOwner = ownerRatio / 100

  const denominator = wOwner + (1 - wOwner) / (1 - r)

  if (denominator <= 0) return 0
  return totalProfit / denominator
}

const computeMemberShare = (
  member: Member,
  fairBaseProfit: number,
  feeRate: number,
  isOwner: boolean,
): DistributionResult => {
  const r = feeRate / 100
  const w = member.ratio / 100

  const targetFinal = Math.floor(fairBaseProfit * w)

  if (isOwner) {
    return {
      ...member,
      transferAmount: 0,
      finalReceivedAmount: targetFinal,
    }
  }

  const transfer = Math.floor(targetFinal / (1 - r))
  const finalReceived = Math.floor(transfer * (1 - r))

  return {
    ...member,
    transferAmount: transfer,
    finalReceivedAmount: finalReceived,
  }
}

export const distributeProfitByPercent = (
  totalProfit: number,
  feeRate: number,
  members: Member[],
  mode: Mode,
): DistributionResult[] => {
  const normalizedMembers = normalizeMembers(members, mode)

  const activeOwnerIndex = 0
  const ownerMember = normalizedMembers[activeOwnerIndex]

  const fairBaseProfit = calculateFairBaseProfit(
    totalProfit,
    ownerMember.ratio,
    feeRate,
  )

  const results = normalizedMembers.map((member, idx) =>
    computeMemberShare(
      member,
      fairBaseProfit,
      feeRate,
      idx === activeOwnerIndex, // isOwner check
    ),
  )

  return results
}
