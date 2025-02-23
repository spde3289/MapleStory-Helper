import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 보스 결정석 계산기',
  description:
    '편하게 주간보스 수익을 계산해 드려요. 캐릭터 등록이나 API KEY 등록시 전투력을 기반으로 자동 계산해 드립니다!',
  keywords:
    '메이플스토리, 메이플스토리 헬퍼, 메이플 헬퍼,주보돌이, 주간보스 결정석, 스데돌이, 스데, 하스데, 이루시, 하스데, 돌이, 검밑솔, 결정석, 주간수익, 보스 수익, 결정석 수익, 노칼, 전투력',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex xs:flex-col  w-full p-3 h-full xs:pt-12 lg:pl-12 gap-3 box-border overflow-x-auto scrollBar ">
      {children}
    </main>
  )
}
