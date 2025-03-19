import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 데스티니 해방 퀘스트 계산기',
  description:
    '제네시스 무기에서 또 다른 가능성을 발견한 도원경의 선인들. 과연 대적자는 검은 마법사가 남겨준 힘을 스스로 넘어설 수 있을까? 메이플스토리 데스티니 해방퀘스트(데스티니 무기)의 남은 시간을 계산해드려요.',
  keywords:
    '해방퀘, 해방예상, 해방예상시간, 데스티니무기, 데티무기, 데티해방, 대적저의 결의',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex flex-col lg:flex-row gap-2">{children}</div>
}
