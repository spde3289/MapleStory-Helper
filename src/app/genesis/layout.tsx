import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 해방 퀘스트 계산기',
  description:
    '메이플스토리 검은마법사 해방퀘스트(제네시스 무기)의 남은 시간을 계산해드려요.',
  keywords:
    '해방퀘, 해방예상, 해방예상시간, 제네시스무기, 제네무기, 제네해방, 어둠의 흔적',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex xs:flex-col p-3 lg:justify-center lg:items-center w-full h-full xs:pt-12 lg:pl-12 gap-3 box-border overflow-x-auto scrollBar">
      {children}
    </main>
  )
}
