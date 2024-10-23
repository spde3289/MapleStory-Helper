import { Get } from "./client";

export const getCharOcid = async (characterName: string) => {
  return Get("api/maplestory/character", {
    params: {
      character_name: characterName,
    },
  })
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
