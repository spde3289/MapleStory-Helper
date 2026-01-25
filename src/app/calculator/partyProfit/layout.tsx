import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메이플 헬퍼 - 보스 분배금 계산기',
}

const SeokbangLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div className="flex flex-col h-full py-40">{children}</div>
}

export default SeokbangLayout
