'use client'

import { CSSProperties, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface TooltipProps {
  tip: string
  targetRect: DOMRect | null
}

const Tooltip = ({ tip, targetRect }: TooltipProps) => {
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({})
  const [tooltipContainer, setTooltipContainer] = useState<HTMLElement | null>(
    null,
  )

  useEffect(() => {
    const container = document.getElementById('tooltip-root')
    setTooltipContainer(container)
  }, [])

  useEffect(() => {
    if (targetRect) {
      const { top, left, right, width } = targetRect

      const isVeryLeft = left < 50
      const isVeryright = window.innerWidth < right + 50

      if (!isVeryLeft && !isVeryright) {
        setTooltipStyle({
          position: 'fixed',
          top: top - 32,
          left: left + width / 2,
          transform: 'translateX(-50%)',
          zIndex: 1000,
        })
      }

      if (isVeryLeft) {
        setTooltipStyle({
          position: 'fixed',
          top: top - 32,
          left,
          zIndex: 1000,
        })
      }
      if (isVeryright) {
        setTooltipStyle({
          position: 'fixed',
          top: top - 32,
          right: window.innerWidth - right,
          zIndex: 1000,
        })
      }
    }
  }, [targetRect])

  if (!tooltipContainer) return null

  return ReactDOM.createPortal(
    <div
      role="tooltip"
      style={tooltipStyle}
      className="px-2 py-1 bg-white border dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 text-sm rounded transition-opacity"
    >
      {tip}
    </div>,
    tooltipContainer,
  )
}

export default Tooltip
