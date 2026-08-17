import { useRef, useCallback } from 'react'
import { flushSync } from 'react-dom'

interface CircularTransitionOptions {
  duration?: number
  easing?: string
}

export function useCircularTheme(
  isDark: boolean,
  onToggleTheme: () => void,
  options: CircularTransitionOptions = {}
) {
  const isTransitioningRef = useRef(false)
  const {
    duration = 650,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  } = options

  const triggerTransition = useCallback(
    (event: React.MouseEvent<HTMLElement> | MouseEvent) => {
      // 1. Multiple Click Protection
      if (isTransitioningRef.current) {
        return
      }

      // 2. Reduced Motion Check
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      // 3. Fallback if View Transitions API is not supported or reduced motion is preferred
      if (!('startViewTransition' in document) || prefersReducedMotion) {
        onToggleTheme()
        return
      }

      // 4. Calculate exact center coordinate of the clicked button
      let x = event.clientX
      let y = event.clientY

      const target = event.currentTarget as HTMLElement | null
      if (target) {
        const rect = target.getBoundingClientRect()
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      }

      // 5. Calculate maximum radius to reach all 4 viewport corners
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      isTransitioningRef.current = true

      // 6. Execute View Transition
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = document as any
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          onToggleTheme()
        })
      })

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]

          const animation = document.documentElement.animate(
            {
              clipPath,
            },
            {
              duration,
              easing,
              pseudoElement: '::view-transition-new(root)',
            }
          )

          animation.finished
            .catch(() => {})
            .finally(() => {
              isTransitioningRef.current = false
            })
        })
        .catch(() => {
          isTransitioningRef.current = false
        })

      transition.finished
        .catch(() => {})
        .finally(() => {
          isTransitioningRef.current = false
        })
    },
    [isDark, onToggleTheme, duration, easing]
  )

  return {
    triggerTransition,
    isTransitioning: isTransitioningRef.current,
  }
}
