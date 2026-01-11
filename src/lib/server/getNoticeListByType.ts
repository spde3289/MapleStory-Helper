import {
  getCashshopNoticeList,
  getEventNoticeList,
  getNoticeList,
  getUpdateNoticeList,
} from '@/lib/nexonApi/noticeApi'
import type { NoticeList, NoticeType } from '@/types/domain/notice'

import type {
  CashshopNoticeListResponse,
  EventNoticeListResponse,
  NoticeListResponse,
  UpdateNoticeListResponse,
} from '@/types/nexon/notice'

export const normalizeNoticeList = (
  type: NoticeType,
  data:
    | NoticeListResponse
    | UpdateNoticeListResponse
    | EventNoticeListResponse
    | CashshopNoticeListResponse,
): NoticeList => {
  switch (type) {
    case 'notice': {
      const d = data as NoticeListResponse
      return {
        type,
        items: d.notice.map((n) => ({
          noticeId: n.notice_id,
          title: n.title,
          url: n.url,
          date: n.date,
        })),
      }
    }

    case 'update': {
      const d = data as UpdateNoticeListResponse
      return {
        type,
        items: d.update_notice.map((n) => ({
          noticeId: n.notice_id,
          title: n.title,
          url: n.url,
          date: n.date,
        })),
      }
    }

    case 'event': {
      const d = data as EventNoticeListResponse
      return {
        type,
        items: d.event_notice.map((n) => ({
          noticeId: n.notice_id,
          title: n.title,
          url: n.url,
          date: n.date,
          event: { start: n.date_event_start, end: n.date_event_end },
        })),
      }
    }

    case 'cashshop': {
      const d = data as CashshopNoticeListResponse
      return {
        type,
        items: d.cashshop_notice.map((n) => ({
          noticeId: n.notice_id,
          title: n.title,
          url: n.url,
          date: n.date,
          sale: {
            start: n.date_sale_start,
            end: n.date_sale_end,
            ongoing: n.ongoing_flag === 'true',
          },
        })),
      }
    }

    default: {
      const exhaustive: never = type
      return exhaustive
    }
  }
}

export const getNoticeListByType = (type: NoticeType) => {
  switch (type) {
    case 'notice':
      return getNoticeList()
    case 'update':
      return getUpdateNoticeList()
    case 'event':
      return getEventNoticeList()
    case 'cashshop':
      return getCashshopNoticeList()
    default: {
      const exhaustive: never = type
      return exhaustive
    }
  }
}

export const buildNoticeList = async (
  type: NoticeType,
): Promise<NoticeList> => {
  const data = await getNoticeListByType(type)

  return normalizeNoticeList(type, data)
}
