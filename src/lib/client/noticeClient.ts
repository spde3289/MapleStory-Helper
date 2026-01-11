import { ROUTER_ENDPOINTS } from '@/constants/routers/routerEndpoints'
import {
  NoticeDetail,
  NoticeList,
  NoticeType,
} from '@/types/domain/game/notice'
import { client } from './client'

interface FetchfetchNoticeParams {
  type: NoticeType
}

// 공고 리스트 요청 함수
export const fetchNoticeList = async (
  params: FetchfetchNoticeParams,
): Promise<NoticeList> => {
  const { data } = await client.get(ROUTER_ENDPOINTS.NOTICE.ROOT, {
    params,
  })

  return data
}

// 공고 리스트 요청 함수
export const fetchNotice = async (
  noticeId: string,
  params: FetchfetchNoticeParams,
): Promise<NoticeDetail> => {
  const { data } = await client.get(ROUTER_ENDPOINTS.NOTICE.DETAIL(noticeId), {
    params,
  })

  return data
}
