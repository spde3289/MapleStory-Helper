export const checkHangulRex = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/ // 한글, 영어, 숫자만 입력 가능 스페이스바 불가능
  if (regex.test(value)) return true
  return false
}
