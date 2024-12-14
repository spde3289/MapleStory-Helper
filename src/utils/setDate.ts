export const setYear = (year: number) => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + year)

  return date
}

export const convertTime = (weeks: number): string => {
  const weeksInMonth = 4
  const monthsInYear = 12

  // 주를 월과 나머지 주로 변환
  const months = Math.floor(weeks / weeksInMonth)
  const remainingWeeks = weeks % weeksInMonth

  // 월을 년과 나머지 월로 변환
  const years = Math.floor(months / monthsInYear)
  const remainingMonths = months % monthsInYear

  // 결과 문자열 생성
  let result = ''
  if (years > 0) result += `${years}년 `
  if (remainingMonths > 0) result += `${remainingMonths}달 `
  if (remainingWeeks > 0) result += `${Math.ceil(remainingWeeks)}주`

  return result.trim() // 앞뒤 공백 제거
}
