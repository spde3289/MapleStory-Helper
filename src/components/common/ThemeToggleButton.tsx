'use client'

import { Theme, useTheme } from '@/context/ThemeContext'
import useHoverLockPopup from '@/hooks/usePopup' // 너가 쓰는 경로 그대로
import clsx from 'clsx'
import { ReactNode } from 'react'
import { CiBrightnessUp, CiDark, CiMonitor } from 'react-icons/ci'

interface ThemeItemProps {
  onClickEvent: (theme: Theme) => void
  currentTarget: boolean
  children: ReactNode
  theme: Theme
}

const ThemeItem = ({
  onClickEvent,
  currentTarget,
  children,
  theme,
}: ThemeItemProps) => {
  return (
    <button
      data-state={currentTarget}
      onClick={() => onClickEvent(theme)}
      className={clsx(
        'flex w-full grow items-center',
        'px-2 py-1.5 rounded',
        'text-left select-none outline-none',
        'hover:bg-stone-100 dark:hover:bg-neutral-700',
        'hover:bg-stone-100 dark:hover:bg-neutral-700',
      )}
    >
      <span
        data-state={currentTarget}
        className={clsx(
          'flex grow items-center gap-x-1',
          'text-xs md:text-sm font-normal text-nowrap rounded-md',
          'data-[state=true]:font-normal',
          'text-[#a1a1a1] dark:text-[#dfdfdf] data-[state=true]:text-black dark:data-[state=true]:text-orange-400',
        )}
      >
        {children}
      </span>
    </button>
  )
}

const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const { rootRef, open, onClickLock, unlockAndClose } =
    useHoverLockPopup<HTMLDivElement>()

  const onClickEventHendler = (nextTheme: Theme) => {
    setTheme(nextTheme)
    unlockAndClose()
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClickLock()
        }}
        className={clsx(
          'inline-flex items-center justify-center',
          'h-8 w-8 rounded-full',
          'border border-neutral-300 dark:border-neutral-700',
          'bg-white dark:bg-neutral-900',
          'text-[#2a3038] dark:text-[#dfdfdf]',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800/70',
        )}
        aria-label="Toggle theme options"
        aria-expanded={open}
      >
        {resolvedTheme === 'dark' ? (
          <CiDark size={20} />
        ) : (
          <CiBrightnessUp size={20} />
        )}
      </button>
      {open && (
        <div
          className={clsx(
            'absolute right-0 mt-2 px-1 py-1.5 z-[1000] flex flex-col gap-1 rounded-lg border',
            'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 shadow-lg',
          )}
        >
          <ThemeItem
            theme="light"
            onClickEvent={onClickEventHendler}
            currentTarget={theme === 'light'}
          >
            <span className="flex items-center gap-2">
              <CiBrightnessUp size={20} />
              라이트
            </span>
          </ThemeItem>
          <ThemeItem
            theme="dark"
            onClickEvent={onClickEventHendler}
            currentTarget={theme === 'dark'}
          >
            <span className="flex items-center gap-2">
              <CiDark size={20} />
              다크
            </span>
          </ThemeItem>
          <ThemeItem
            theme="system"
            onClickEvent={onClickEventHendler}
            currentTarget={theme === 'system'}
          >
            <span className="flex items-center gap-2">
              <CiMonitor size={20} />
              시스템
            </span>
          </ThemeItem>
        </div>
      )}
    </div>
  )
}

export default ThemeToggleButton
