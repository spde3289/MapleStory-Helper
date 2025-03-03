import React, {
  CSSProperties,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'

interface ButtonProps {
  id?: string
  size?: 'sm' | 'md'
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  tip?: string
  className?: string
}

const Button = ({
  id,
  onClick,
  children,
  tip,
  className,
  size = 'sm',
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({})
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-sm',
    md: 'px-2 py-1 text-base',
  }

  useEffect(() => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setTooltipStyle({
        position: 'fixed',
        top: rect.top - 32,
        left: rect.left + rect.width / 2,
        transform: 'translateX(-50%)',
        zIndex: 1000,
      })
    }
  }, [isHovered])

  const tooltipContainer = document.getElementById('tooltip-root')

  const tooltipElement =
    isHovered &&
    tip &&
    tooltipContainer &&
    ReactDOM.createPortal(
      <div
        role="tooltip"
        style={tooltipStyle}
        className="px-2 py-1 bg-gray-700 text-white text-sm rounded transition-opacity"
      >
        {tip}
      </div>,
      tooltipContainer,
    )

  return (
    <div className="relative w-max group rounded-lg border border-gray-300 bg-white text-theme-sm font-medium text-gray-900 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        id={id}
        className={`${sizeClasses[size]} ${className}`}
        type="button"
      >
        {children}
      </button>
      {tooltipElement}
    </div>
  )
}

export default Button
