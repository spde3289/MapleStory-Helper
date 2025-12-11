import { SEVER_ERROR_TYPES } from './severErrorTypes'

export const ERROR_DEFINITIONS = {
  // 공통 에러
  [SEVER_ERROR_TYPES.UNKNOWN]: {
    defaultMessage: '알 수 없는 오류가 발생했습니다.',
  },
  [SEVER_ERROR_TYPES.INTERNAL]: {
    defaultMessage: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },

  // 요청 함수 에러
  [SEVER_ERROR_TYPES.CHARACTER_FULL_INFO_FETCH_ERROR]: {
    defaultMessage: '캐릭터 전체 정보를 불러오는 중 오류가 발생했습니다.',
  },
  [SEVER_ERROR_TYPES.CHARACTER_FETCH_ERROR]: {
    defaultMessage: '캐릭터 정보를 가져오지 못했습니다.',
  },
  [SEVER_ERROR_TYPES.CHARACTERS_FETCH_ERROR]: {
    defaultMessage: '여러 캐릭터 정보를 불러오는 중 일부 오류가 발생했습니다.',
  },

  // 로직 에러
  [SEVER_ERROR_TYPES.POWER_FILTER_MIN_LEVEL]: {
    defaultMessage: '캐릭터 레벨이 조건에 맞지 않아 필터링할 수 없습니다.',
  },
  [SEVER_ERROR_TYPES.STAT_PARSE_ERROR]: {
    defaultMessage: '스탯 정보를 해석하는 중 오류가 발생했습니다.',
  },

  // 넥슨 API 에러
  [SEVER_ERROR_TYPES.NEXON_API]: {
    defaultMessage: '넥슨 API 호출 중 오류가 발생했습니다.',
  },
  [SEVER_ERROR_TYPES.NEXON_SERVER]: {
    defaultMessage: '넥슨 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  [SEVER_ERROR_TYPES.NEXON_PER_MISSION]: {
    defaultMessage: '넥슨 API 권한이 없습니다. API KEY를 확인해주세요.',
  },
  [SEVER_ERROR_TYPES.NEXON_INVALID_IDENTIFIER]: {
    defaultMessage: '유효하지 않은 캐릭터 또는 식별자입니다.',
  },
  [SEVER_ERROR_TYPES.NEXON_INVALID_PARAMETER]: {
    defaultMessage: '요청 파라미터가 유효하지 않습니다.',
  },
  [SEVER_ERROR_TYPES.NEXON_INVALID_API_KEY]: {
    defaultMessage: '유효하지 않은 API KEY입니다.',
  },
  [SEVER_ERROR_TYPES.NEXON_INVALID_PATH]: {
    defaultMessage: '올바르지 않은 API 경로입니다.',
  },
  [SEVER_ERROR_TYPES.NEXON_RATE_LIMIT]: {
    defaultMessage:
      '넥슨 API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
  },
  [SEVER_ERROR_TYPES.NEXON_DATA_PREPARING]: {
    defaultMessage:
      '넥슨 서버에서 데이터를 준비하고 있습니다. 잠시 후 다시 시도해주세요.',
  },
  [SEVER_ERROR_TYPES.NEXON_GAME_MAINTENANCE]: {
    defaultMessage: '넥슨 게임 점검 중입니다.',
  },
  [SEVER_ERROR_TYPES.NEXON_API_MAINTENANCE]: {
    defaultMessage: '넥슨 API 점검 중입니다.',
  },
}
