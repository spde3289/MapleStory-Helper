'use client'

import React, { MouseEventHandler, useRef, useState } from 'react'
import Tooltip from './Tooltip'

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
  className = '',
  size = 'sm',
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-sm',
    md: 'px-2 py-1 text-base',
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (buttonRef.current) {
      setTargetRect(buttonRef.current.getBoundingClientRect())
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <div className="w-max group rounded-lg border border-gray-300 bg-white text-theme-sm font-medium text-gray-900 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={id}
        className={`${sizeClasses[size]} ${className}`}
        type="button"
      >
        {children}
      </button>
      {isHovered && tip && <Tooltip tip={tip} targetRect={targetRect} />}
    </div>
  )
}

export default Button
