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
