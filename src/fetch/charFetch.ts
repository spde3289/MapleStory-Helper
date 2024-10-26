import axios from "axios";
import { Get } from "./client";

interface Data {
  data?: MainCharacter;
  status?: number;
  statusText?: string;
  name?: string;
}

export interface MainCharacter {
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
  ocid: string;
  final_stat: {
    stat_name: string;
    stat_value: string;
  }[];
  remain_ap: number;
}

interface ResponseDataType {
  statusText: string;
  status: number;
  name: string;
  // error: {
  //   message: string;
  // };
}

export const getCharOcid = async (characterName: string): Promise<Data> => {
  try {
    const characterResponse = await Get<MainCharacter>(
      "api/maplestory/character",
      {
        params: {
          character_name: characterName,
        },
      }
    );
    return characterResponse;
  } catch (error) {
    if (axios.isAxiosError<ResponseDataType, any>(error)) {
      console.log(error.response?.data.statusText);
      return {
        status: error?.response?.status ? error?.response?.status : 400,
        statusText: error.response?.data.statusText
          ? error.response?.data.statusText
          : "에러",
        name: error.response?.data.name ? error.response?.data.name : "에러",
      };
    } else {
      return {
        status: 400,
        statusText: "An unexpected error occurred",
      };
    }
  }
};
