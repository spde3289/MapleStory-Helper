export const NOTICE_TYPES = ['notice', 'update', 'event', 'cashshop'] as const
export type NoticeType = (typeof NOTICE_TYPES)[number]

export interface NoticeListItem {
  noticeId: number
  title: string
  url: string
  date: string
  // type에 따라 optional 메타
  event?: { start: string; end: string }
  sale?: { start: string; end: string; ongoing: boolean }
}

export interface NoticeList {
  type: NoticeType
  items: NoticeList[]
}

export interface NoticeDetail {
  type: NoticeType
  noticeId?: number // 넥슨 상세에 id가 없으면(지금 스키마상 없음) 우리가 params로 채워줄 수 있음
  title: string
  url: string
  contents: string
  date: string
  event?: { start: string; end: string }
  sale?: { start: string; end: string; ongoing: boolean }
}
