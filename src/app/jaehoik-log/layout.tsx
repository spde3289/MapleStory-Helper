import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 재획 가계부',
  description:
    '재획을 통해 얼마를 벌었는지 기록, 확인할 수 있는 오픈서비스 입니다. 메이플스토리를 하며 엑셀로 관리하던 혹은 엑셀을 다루기 힘들어 고민하시던 분들을 위하고 있습니다. #재획 #재획엑셀 #재획가계부 #재획기록 #재획로그',
  keywords:
    '재획, 소재, 사냥, 솔에르다 조각, 다조, 코어젬스톤, 코젬, 메소, 소재비, 재획비',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-2">{children}</div>
  )
}
