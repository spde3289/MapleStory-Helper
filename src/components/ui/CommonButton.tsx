'use client'

import React, { MouseEventHandler } from 'react'

interface ButtonProps {
  id?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

const CommonButton = ({
  id,
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      id={id}
      disabled={disabled}
      className="rounded-md border border-gray-300 dark:border-white/[0.2] dark:bg-neutral-900 px-3 py-1.5 text-sm focus:outline-none hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-600 disabled:border-gray-100"
      type="button"
    >
      {children}
    </button>
  )
}

export default CommonButton
