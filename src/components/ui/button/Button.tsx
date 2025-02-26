import { MouseEventHandler } from 'react'

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
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-sm',
    md: 'px-2 py-1 text-base',
  }

  return (
    <div className="relative group rounded-lg border border-gray-300 bg-white text-theme-sm font-medium text-gray-900 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
      <button
        onClick={onClick}
        id={id}
        className={`${sizeClasses[size]} ${className} `}
        type="button"
      >
        {children}
      </button>
      {tip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          {tip}
        </div>
      )}
    </div>
  )
}

export default Button
