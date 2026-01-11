export const MAPLE_ENDPOINTS = {
  CHARACTER: {
    OCID: '/v1/id', // 캐릭터 식별자(ocid) 조회
    LIST: '/v1/character/list', // 캐릭터 목록 조회
    BASIC: '/v1/character/basic', // 기본 정보
    STAT: '/v1/character/stat', // 종합 능력치
  },
  USER: {
    RAIDER: '/v1/user/union-raider', // 유니온 공격대 정보 조회
  },
} as const

export const MAPLESTORY_NOTICE_API = {
  NOTICE: {
    LIST: '/v1/notice',
    DETAIL: '/v1/notice/detail',
  },
  UPDATE: {
    LIST: '/v1/notice-update',
    DETAIL: '/v1/notice-update/detail',
  },
  EVENT: {
    LIST: '/v1/notice-event',
    DETAIL: '/v1/notice-event/detail',
  },
  CASHSHOP: {
    LIST: '/v1/notice-cashshop',
    DETAIL: '/v1/notice-cashshop/detail',
  },
} as const
