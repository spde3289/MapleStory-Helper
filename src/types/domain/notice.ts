export const NOTICE_TYPES = ['notice', 'update', 'event', 'cashshop'] as const
export type NoticeType = (typeof NOTICE_TYPES)[number]

export interface NoticeItem {
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
  items: NoticeItem[]
}

export interface NoticeDetail {
  type: NoticeType
  noticeId?: number
  title: string
  url: string
  contents: string
  date: string
  event?: { start: string; end: string }
  sale?: { start: string; end: string; ongoing: boolean }
}
