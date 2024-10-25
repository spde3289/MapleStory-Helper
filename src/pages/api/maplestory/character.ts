import type { NextApiRequest, NextApiResponse } from "next";
import { Get, isAxiosError } from "../backEnd";

export const getMapleKey = () => process.env.NEXT_PUBLIC_MAPLEAPI_KEY;

type Data = {
  message?: string;
  error?: string; // error 속성 추가
  status?: number; // 상태 코드 추가
  statusText?: string; // 상태 텍스트 추가
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { character_name } = req.query;
  // 대표캐릭터 get 요청
  if (req.method === "GET" && typeof character_name === "string") {
    try {
      // 외부 API 요청
      const response = await getCharacter(character_name);

      res.status(200).json(response); // 데이터를 클라이언트에 응답
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

interface ResponseDataType {
  statusText?: string;
  status?: number;
  error: string;
}

interface CharacterIdResponse {
  ocid: string;
}

interface basicResponse {
  date: string;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
  character_date_create: string;
  access_flag: string;
  liberation_quest_clear_flag: string;
}

// 캐릭터 기본정보 + 스텟 정보
const getCharacter = async (character_name: string) => {
  try {
    // 1단계: 캐릭터 식별자 가져오기
    const idResponse = await Get<CharacterIdResponse>("/v1/id", {
      params: { character_name },
    });

    const ocid = idResponse.data.ocid;

    // 2단계: 캐릭터 기본 정보 가져오기
    const basicResponse = await Get<basicResponse>("/v1/character/basic", {
      params: { ocid: ocid },
    });

    return { ...basicResponse.data }; // 캐릭터 기본 정보 반환
  } catch (error) {
    if (isAxiosError<ResponseDataType>(error)) {
      return {
        status: error.response?.status,
        statusText: error.response?.statusText,
        error: "API Error", // API 오류 메시지 추가
      };
    } else {
      return {
        error: "An unexpected error occurred", // 예기치 않은 오류 처리
      };
    }
  }
};
