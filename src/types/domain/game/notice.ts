export const NOTICE_TYPES = ['notice', 'update', 'event', 'cashshop'] as const
export type NoticeType = (typeof NOTICE_TYPES)[number]
