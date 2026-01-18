import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 아스트라 보조무기 석방 퀘스트 계산기',
  description: '메이플스토리 보조무기 석방 퀘스트 의 남은 시간을 계산해드려요.',
  keywords:
    '메이플스토리, 해방예상, 해방예상시간, 아스트라, 아스트라 보조무기, 보조무기, 에리온의 조각, 격전의 흔적',
}

const SeokbangLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div className="flex flex-col h-full py-40">{children}</div>
}

export default SeokbangLayout
