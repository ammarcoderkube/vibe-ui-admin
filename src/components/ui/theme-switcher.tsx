import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'
import { useCircularTheme } from '../../hooks/useCircularTheme'

export interface ThemeSwitcherProps {
  isDark: boolean
  onToggle: () => void
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  isDark,
  onToggle,
  className,
}) => {
  const { triggerTransition } = useCircularTheme(isDark, onToggle, {
    duration: 650,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  })

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={triggerTransition}
      className={`relative rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer select-none ${
        className || ''
      }`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-slate-800 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
