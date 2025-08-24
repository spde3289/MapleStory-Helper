export type ItemType = {
  name: string
  path: string
  description: string
}

export const calculatorItems = [
  {
    path: '/gem',
    name: '주보 수익',
    description: '내 주보 수익 캐릭터별로 싹 정리해드려요',
  },
  {
    path: '/genesis',
    name: '제네시스 해방 퀘스트',
    description: '언제 해방될지 날짜로 딱 알려드려요',
  },
  {
    path: '/destiny',
    name: '데스티니 초월 퀘스트',
    description: '초월까지 얼마나 남았는지 바로 확인해보세요',
  },
]

export const ledgerItems = [
  {
    path: '/jaehoik-log',
    name: '재획 가계부',
    description: '오늘 얼마나 벌었는지 한눈에 확인해보세요',
  },
]
