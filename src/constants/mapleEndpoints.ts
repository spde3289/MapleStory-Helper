export const MAPLE_ENDPOINTS = {
  character: {
    ocid: '/v1/id', // 캐릭터 식별자(ocid) 조회
    list: '/v1/character/list', // 캐릭터 목록 조회
    basic: '/v1/character/basic', // 기본 정보
    stat: '/v1/character/stat', // 종합 능력치
  },
  user: {
    raider: '/v1/user/union-raider', // 유니온 공격대 정보 조회
  },
} as const
