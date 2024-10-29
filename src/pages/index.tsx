import CharacterCreator from "@/components/characterCreator";

export default function Home() {
  return (
    <>
      <main className="h-full flex items-center justify-center">
        <div>
          <CharacterCreator />
        </div>
      </main>
    </>
  );
}
