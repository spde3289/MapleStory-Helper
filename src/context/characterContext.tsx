import { useContext, createContext, useState, useEffect } from "react";
import { MainCharacter } from "@/fetch/charFetch";

interface MainCharacterContextType {
  mainCharacter: MainCharacter | null;
  setMainCharacter: (newValue: MainCharacter | null) => void;
}

const MainCharacterContext = createContext<null | MainCharacterContextType>(
  null
);

const MainCharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mainCharacter, setMainCharacter] = useState<MainCharacter | null>(
    null
  );

  return (
    <MainCharacterContext.Provider
      children={children}
      value={{ mainCharacter, setMainCharacter }}
    />
  );
};

export const useMainCharacterContext = () => {
  const context = useContext(MainCharacterContext);
  if (!context) {
    throw new Error(
      "useMainCharacterContext must be used within a MainCharacterProvider"
    );
  }
  return context; // Context의 값을 반환
};

export default MainCharacterProvider;
