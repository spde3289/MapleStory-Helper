import { ROUTES } from './routers/appRoutes'

const NAV_ITEMS = [
  {
    name: '계산기',
    children: [
      {
        path: ROUTES.CALCULATOR.GEM,
        name: '주보수익',
      },
      {
        path: ROUTES.CALCULATOR.GENESIS,
        name: '제네시스 해방 퀘스트',
      },
      {
        path: ROUTES.CALCULATOR.DESTINY,
        name: '데스티니 해방 퀘스트',
      },
      {
        path: ROUTES.CALCULATOR.SEOKBANG,
        name: '보조무기 석방 퀘스트',
      },
    ],
  },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
export type NavChildItem = NavItem['children'][number]

export default NAV_ITEMS
