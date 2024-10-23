import { useState, useEffect } from "react";
import { getCharOcid } from "@/fetch/charFetch";

const isCheckCharacter = (data: string): boolean => {
  return false;
};

export default function Home() {
  const [character, setCharacter] = useState<string>("");

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      const data = await getCharOcid(character);
      console.log(data);
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
