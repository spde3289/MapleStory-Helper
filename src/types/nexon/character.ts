/** 캐릭터 식별자(ocid)만 가진 최소 단위 */
export interface CharacterIdResponse {
  ocid: string
}

/** 캐릭터 요약 정보 (계정의 캐릭터 목록에서 사용) */
export interface CharacterSummary {
  ocid: string // 캐릭터 식별자
  character_name: string // 캐릭터 명
  world_name: string // 월드 명
  character_class: string // 캐릭터 직업
  character_level: number // 캐릭터 레벨 (int64)
}

/** 한 계정 단위 */
export interface AccountCharacterList {
  account_id: string // 메이플스토리 계정 식별자
  character_list: CharacterSummary[] // 캐릭터 목록
}

/** GET /maplestory/v1/character/list (CharacterList) */
export interface CharacterListResponse {
  account_list: AccountCharacterList[] // 메이플스토리 계정 목록
}

/** GET /maplestory/v1/character/basic */
export interface CharacterBasicResponse {
  date: string // "2023-12-21T00:00+09:00" 같은 ISO 문자열
  character_name: string
  world_name: string
  character_gender: string
  character_class: string
  character_class_level: string
  character_level: number
  character_exp: number
  character_exp_rate: string
  character_guild_name: string
  character_image: string
  character_date_create: string // 생성일
  access_flag: string
  liberation_quest_clear: string
}

export interface CharacterStatEntry {
  stat_name: string // 예: "최소 스탯 공격력"
  stat_value: string // "43.75" 같은 문자열 (API 기준)
}

/** GET /maplestory/v1/character/stat */
export interface CharacterStatResponse {
  date: string // "2023-12-21T00:00+09:00"
  character_class: string
  final_stat: CharacterStatEntry[]
  remain_ap: number
}
