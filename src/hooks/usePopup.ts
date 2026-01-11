'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export interface UseHoverLockPopupOptions {
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
}

export interface UseHoverLockPopupReturn<T extends HTMLElement> {
  rootRef?: RefObject<T>
  open: boolean
  locked: boolean
  onOpen: () => void
  onClose: () => void
  onClickLock: () => void
  unlockAndClose: () => void
}

const useHoverLockPopup = <T extends HTMLElement>(
  options: UseHoverLockPopupOptions = {},
): UseHoverLockPopupReturn<T> => {
  const { closeOnOutsideClick = true, closeOnEscape = true } = options

  const rootRef = useRef<T>(null)

  const [open, setOpen] = useState(false)
  const [locked, setLocked] = useState(false)

  const onOpen = useCallback(() => {
    if (locked) return
    setOpen(true)
  }, [locked])

  const onClose = useCallback(() => {
    if (locked) return
    setOpen(false)
  }, [locked])

  const onClickLock = useCallback(() => {
    setOpen(true)
    setLocked(true)
  }, [])

  const unlockAndClose = useCallback(() => {
    setOpen(false)
    setLocked(false)
  }, [])

  useEffect(() => {
    if (!open && !locked) return

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!closeOnOutsideClick) return
      const root = rootRef.current
      const target = e.target as Node | null

      if (root && target && !root.contains(target)) {
        unlockAndClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!closeOnEscape) return
      if (e.key === 'Escape') {
        unlockAndClose()
      }
    }

    document.addEventListener('mousedown', handlePointerDown, true)
    document.addEventListener('touchstart', handlePointerDown, true)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true)
      document.removeEventListener('touchstart', handlePointerDown, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, locked, closeOnOutsideClick, closeOnEscape, unlockAndClose])

  return {
    rootRef,
    open,
    locked,
    onOpen,
    onClose,
    onClickLock,
    unlockAndClose,
  }
}

export default useHoverLockPopup
