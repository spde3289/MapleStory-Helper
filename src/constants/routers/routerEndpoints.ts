export const ROUTER_ENDPOINTS = {
  CHARACTER: {
    LIST: '/characters',
    SINGLE: (characterName: string) => `/characters/${characterName}`,
  },
  NOTICE: {
    ROOT: '/notice',
    DETAIL: (noticeId: string) => `/notice/${noticeId}`,
  },
} as const
