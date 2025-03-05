// CharacterContainerSkeleton.tsx
const CharacterContainerSkeleton = () => (
  <div className="p-1 h-fit w-full relative no-drag">
    {/* World 버튼 스켈레톤 */}
    <div className="absolute w-full flex overflow-y-scroll scrollBar gap-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="w-20 h-8 bg-gray-300 rounded-md animate-pulse"
        />
      ))}
    </div>
    {/* 캐릭터 리스트 스켈레톤 */}
    <div className="rounded-md mt-11 gap-2 flex flex-col dark:border-white/[0.05] dark:bg-white/[0.03]">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-10 bg-gray-300 rounded animate-pulse" />
      ))}
    </div>
  </div>
)

export default CharacterContainerSkeleton
