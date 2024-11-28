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
