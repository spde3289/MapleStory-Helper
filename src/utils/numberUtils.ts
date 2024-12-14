export const formatKoreanNumber = (number: number): string => {
  const units = ['', '만', '억', '조', '경'] // 단위
  let result = ''
  let unitIndex = 0
  let num = number

  if (number === 0) return '0'

  while (num > 0) {
    const chunk = num % 10000
    if (chunk > 0) {
      result = `${chunk}${units[unitIndex]} ${result}`.trim()
    }
    num = Math.floor(num / 10000)
    unitIndex += 1
  }

  return result.trim()
}

export const formatToEokUnit = (number: number): number => {
  if (number < 100000000) {
    return 0 // 1억 미만은 0억으로 처리
  }

  const eok = Math.floor(number / 100000000) // 억 단위 계산
  return eok
}

export const convertTime = (units: number): string => {
  const weeksInMonth = 4
  const monthsInYear = 12

  const months = Math.floor(units / weeksInMonth)
  const remainingWeeks = units % weeksInMonth

  const years = Math.floor(months / monthsInYear)
  const remainingMonths = months % monthsInYear

  let result = ''
  if (years > 0) result += `${years}년 `
  if (remainingMonths > 0) result += `${remainingMonths}달 `
  if (remainingWeeks > 0) result += `${Math.ceil(remainingWeeks)}주`

  return result.trim()
}

interface RewardResult {
  need_darkness: number
  bossReward: number
  blackMageReward: number
  totalReward: number
  date: number
}

export const calculateRewards = (result: RewardResult): RewardResult => {
  const reward = { ...result }

  while (reward.totalReward < reward.need_darkness) {
    reward.totalReward += reward.bossReward
    if (reward.date % 4 === 0 || reward.date === 0) {
      reward.totalReward += reward.blackMageReward
    }
    reward.date += 1
  }
  return reward
}
