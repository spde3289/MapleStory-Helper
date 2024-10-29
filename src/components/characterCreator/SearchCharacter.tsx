import useCharacter from "@/hooks/useCharacter";

const SearchCharacter = () => {
  const { character, handlerChange, handlerSubmit } = useCharacter();

  return (
    <>
      <input
        className="h-8 p-3 rounded-lg"
        placeholder="대표 캐릭터를 등록해주세요"
        value={character}
        onChange={handlerChange}
        onKeyDown={handlerSubmit}
      />
      <div className=""></div>
    </>
  );
};

export default SearchCharacter;
