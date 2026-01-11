/** 공지 리스트 아이템 (Notice / Update 공통) */
export interface NoticeListItem {
  title: string
  url: string
  notice_id: number // int64
  /** example: 2023-12-21T00:00+09:00 */
  date: string
}

/** 공지 상세 (Notice / Update 공통) */
export interface NoticeDetailResponse {
  title: string
  url: string
  contents: string
  /** example: 2023-12-21T00:00+09:00 */
  date: string
}

/** 일반 공지 목록 */
export interface NoticeListResponse {
  notice: NoticeListItem[]
}

/** 업데이트 공지 목록 */
export interface UpdateNoticeListResponse {
  update_notice: NoticeListItem[]
}

/** 이벤트 공지 리스트 아이템 */
export interface EventNoticeListItem extends NoticeListItem {
  date_event_start: string
  date_event_end: string
}

/** 이벤트 공지 목록 */
export interface EventNoticeListResponse {
  event_notice: EventNoticeListItem[]
}

/** 이벤트 공지 상세 */
export interface EventNoticeDetailResponse extends NoticeDetailResponse {
  date_event_start: string
  date_event_end: string
}

/** 캐시샵 공지 리스트 아이템 */
export interface CashshopNoticeListItem extends NoticeListItem {
  date_sale_start: string
  date_sale_end: string
  /** 상시 판매 여부 (true - 상시) */
  ongoing_flag: string
}

/** 캐시샵 공지 목록 */
export interface CashshopNoticeListResponse {
  cashshop_notice: CashshopNoticeListItem[]
}

/** 캐시샵 공지 상세 */
export interface CashshopNoticeDetailResponse extends NoticeDetailResponse {
  date_sale_start: string
  date_sale_end: string
  /** 상시 판매 여부 (true - 상시) */
  ongoing_flag: string
}
