import { useState, useEffect } from "react";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import { getCharOcid } from "@/fetch/charFetch";

export default function Home() {
  const [character, setCharacter] = useState<string>("");

  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  const options = {
    expires: date,
  };

  useEffect(() => {
    const fetchData = async () => {
      const ocid = getCookie("ocid", options);
      if (typeof ocid === "string") {
        const { status, data, statusText } = await getCharOcid(ocid);
        console.log(statusText, data, status);
        if (statusText === "OK") {
          // 전역으로 캐릭터 정보 관리
          console.log(data?.access_flag);
        }
      }
    };

    fetchData();
  }, []);

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      const { status, data, statusText } = await getCharOcid(character);

      console.log(data, statusText, status);
      if (statusText === "OK") {
        // 쿠키에 대표 캐릭터 이름 저장
        setCookie("ocid", data?.character_name, options);
      }
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/;
    if (regex.test(e.target.value)) {
      setCharacter(e.target.value);
    }
  };

  return (
    <>
      <main className="h-full flex items-center justify-center">
        <div>
          <input
            value={character}
            onChange={handlerChange}
            onKeyDown={handlerSubmit}
          />
        </div>
      </main>
    </>
  );
}
