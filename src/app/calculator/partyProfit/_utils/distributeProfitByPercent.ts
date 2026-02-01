export type DistributionResult = {
  id: string
  name: string
  ratio: number
  transferAmount: number
  finalReceivedAmount: number
}

type Member = { id: string; name: string; ratio: number }

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
  ownerId: string,
): DistributionResult[] => {
  if (!members || members.length === 0) {
    return []
  }

  const ownerMember = members.find((m) => m.id === ownerId)

  if (!ownerMember) {
    console.warn(`Owner with ID ${ownerId} not found in members list.`)
    return []
  }

  const fairBaseProfit = calculateFairBaseProfit(
    totalProfit,
    ownerMember.ratio,
    feeRate,
  )

  const results = members.map((member) =>
    computeMemberShare(member, fairBaseProfit, feeRate, member.id === ownerId),
  )

  return results
}
