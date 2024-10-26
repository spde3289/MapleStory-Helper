import { useContext, createContext, useState } from "react";
import { MainCharacter } from "@/fetch/charFetch";

interface MainCharacterContextType {
  maincharacter: MainCharacter | null;
  setMainCharacter: (newValue: MainCharacter) => void;
}

const MainCharacterContext = createContext<null | MainCharacterContextType>(
  null
);

const MainCharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maincharacter, setMainCharacter] = useState<MainCharacter | null>(
    null
  );

  return (
    <MainCharacterContext.Provider
      children={children}
      value={{ maincharacter, setMainCharacter }}
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
