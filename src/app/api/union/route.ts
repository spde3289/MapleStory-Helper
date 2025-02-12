// import axios from 'axios'
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { Get } from '../backEnd'
// import { Paths } from '../path'
// import { ResponseDataType, UnionRaiderResponse } from './types/union'

// const getUnion = async (ocid: string) => {
//   try {
//     // 유니온 공격대 정보 조회
//     const unionRaiderResponse = await Get<UnionRaiderResponse>(
//       Paths.UnionRaider,
//       {
//         params: { ocid },
//       },
//     )

//     const maps = unionRaiderResponse.data.union_block.map((el) => {
//       return {
//         class: el.block_class,
//         level: el.block_level,
//       }
//     })

//     console.log(maps)

//     return {
//       status: 200,
//       statusText: 'OK',
//       data: { ...unionRaiderResponse.data },
//     }
//   } catch (error) {
//     if (axios.isAxiosError<ResponseDataType, any>(error)) {
//       return {
//         status: error.response?.status ? error.response?.status : 400,
//         statusText: error.response?.data.error.message
//           ? error.response?.data.error.message
//           : '에러',
//         name: error.response?.data.error.name
//           ? error.response?.data.error.name
//           : '에러',
//       }
//     }
//     return {
//       status: 400,
//       statusText: 'An unexpected error occurred',
//       name: '',
//     }
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   const { ocid } = req.query
//   // 대표캐릭터 get 요청
//   if (req.method === 'GET' && typeof ocid === 'string') {
//     // 외부 API 요청
//     const response = await getUnion(ocid)

//     console.log(response)

//     if (response.status === 200) {
//       res.status(200).json(response) // 데이터를 클라이언트에 응답
//     } else {
//       res.status(response.status).json(response) // 에러 데이터를 클라이언트에 응답
//     }
//   }
// }
