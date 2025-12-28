const RootFooter = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-600 dark:text-neutral-400">
        <p className="mb-2">Data Based on NEXON OPEN API</p>
        <p className="mb-6">
          This site is not an official site of NEXON and does not provide any
          warranty.
        </p>
        <div className="mb-6">
          <p className="mb-2 font-semibold text-gray-700 dark:text-neutral-300">
            Contact
          </p>
          <ul className="space-y-1">
            <li>
              Kakao Talk :
              <a
                href="https://open.kakao.com/o/sv8vrK8h"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900 dark:hover:text-white"
              >
                1 : 1 오픈 카카오톡
              </a>
            </li>
            <li>
              Email :
              <a
                href="mailto:myer100756@gmail.com"
                className="underline hover:text-gray-900 dark:hover:text-white"
              >
                myer100756@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <p className="text-xs text-gray-500 dark:text-neutral-500">
          ⓒ 2024 에오스@공돌지렁mk1. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default RootFooter
