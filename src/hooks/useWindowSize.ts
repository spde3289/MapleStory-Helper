import { useEffect, useState } from 'react'

type windowSizeType = {
  windowWidth: number
  windowHeight: number
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<windowSizeType>({
    windowWidth: 0,
    windowHeight: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    }

    // 초기 크기 설정
    handleResize()

    // 리스너 추가
    window.addEventListener('resize', handleResize)

    // 정리(clean-up)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
