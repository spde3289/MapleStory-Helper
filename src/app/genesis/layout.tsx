import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 해방 퀘스트 계산기',
  description:
    '메이플스토리 검은마법사 해방퀘스트(제네시스 무기)의 남은 시간을 계산해드려요.',
  keywords:
    '해방퀘, 해방예상, 해방예상시간, 제네시스무기, 제네무기, 제네해방, 어둠의 흔적',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 h-full">{children}</div>
  )
}

export default RootLayout
