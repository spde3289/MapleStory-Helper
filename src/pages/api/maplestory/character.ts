import type { NextApiRequest, NextApiResponse } from "next";
import Get from "../backEnd";

export const getMapleKey = () => process.env.NEXT_PUBLIC_MAPLEAPI_KEY;

type Data = {
  message?: string;
  error?: string; // error 속성 추가
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { character_name } = req.query;
  if (req.method === "GET") {
    try {
      // 외부 API 요청
      const response = await Get("/v1/id", {
        headers: {
          "x-nxopen-api-key": getMapleKey(),
        },
        params: {
          character_name: character_name,
        },
      })
        .then((res) => {
          const data = res.data;
          return data;
        })
        .catch((err) => {
          // 잘못된 유형 요청
          if (err.status === 400) return null;
          if (err.status === 403) return null;
          // 너무 많은 요청
          if (err.status === 429) return "너무 많은 요청";
          // 내부 서버 오류
          if (err.status === 500) return "api 서버 오류";
        });

      res.status(200).json(response); // 데이터를 클라이언트에 응답
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
