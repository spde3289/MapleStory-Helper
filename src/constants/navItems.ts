const NAV_ITEMS = [
  {
    name: '계산기',
    children: [
      {
        path: '/gem',
        name: '주보수익',
      },
      {
        path: '/genesis',
        name: '제네시스 해방 퀘스트',
      },
      {
        path: '/destiny',
        name: '데스티니 해방 퀘스트',
      },
    ],
  },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
export type NavChildItem = NavItem['children'][number]

export default NAV_ITEMS
