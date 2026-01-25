import { NoticeType } from '@/types/domain/notice'

export const ROUTES = {
  CALCULATOR: {
    GEM: '/calculator/gem',
    GENESIS: '/calculator/genesis',
    DESTINY: '/calculator/destiny',
    SEOKBANG: '/calculator/seokbang',
    PARTY_PROFIT: '/calculator/partyProfit',
  },

  GUIDE: {
    ROOT: '/guide',
  },

  BOARD: {
    DETAIL: (category: NoticeType, noticeId: number | string) =>
      `/board/${category}/${noticeId}`,
  },
} as const
