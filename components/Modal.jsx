'use client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

export default function Modal({ children }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-10 bg-black/60 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="bg-white rounded-lg shadow-lg w-full max-w-[95%] h-full max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] lg:max-h-[80vh] xl:max-h-[75vh] p-6"
      >
        {children}
      </div>
    </div>
  )
}
