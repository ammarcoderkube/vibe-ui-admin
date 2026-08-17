import React from 'react'
import { Plus, Search, MessageSquare } from 'lucide-react'
import { ThemeSwitcher } from '../ui/theme-switcher'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { NotificationsPopover } from './NotificationsPopover'
import { ThemePreset } from '../../types/dashboard'
import { cn } from '../../lib/utils'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  isDark: boolean
  onToggleTheme: () => void
  preset: ThemePreset
  onChangePreset: (preset: ThemePreset) => void
  onOpenNewProject: () => void
  onToggleMessagesMobile: () => void
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  preset,
  onChangePreset,
  onOpenNewProject,
  onToggleMessagesMobile,
}) => {
  const presets: { id: ThemePreset; label: string }[] = [
    { id: 'default', label: 'Default' },
    { id: 'glass', label: 'Glass' },
    { id: 'glow', label: 'Glow' },
    { id: 'retro', label: 'Retro' },
  ]

  return (
    <header className="flex w-full items-center justify-between px-4 sm:px-6 py-3.5 relative transition-colors duration-200 gap-3">
      {/* Left: Branding & Search */}
      <div className="flex items-center flex-1 max-w-2xl gap-3 sm:gap-4">
        {/* Custom 3-bar App Icon with brand glow */}
        <div className="hidden sm:flex flex-col justify-center items-center gap-[4px] w-6 h-5 cursor-pointer select-none group shrink-0">
          <span className="w-6 h-[2.5px] rounded-full bg-primary transition-all group-hover:w-5"></span>
          <span className="w-3.5 h-[2.5px] rounded-full bg-[var(--main-color)] transition-all group-hover:w-6"></span>
          <span className="w-3.5 h-[2.5px] rounded-full bg-primary transition-all group-hover:w-6"></span>
        </div>

        {/* Branding */}
        <div className="flex items-center select-none shrink-0">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--main-color)]">
            Vibe<span className="text-primary">UI</span> Admin
          </span>
          <span className="ml-2 hidden lg:inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-primary/15 text-primary border border-primary/20">
            v2.0
          </span>
        </div>

        {/* Search Wrapper */}
        <div className="relative flex items-center w-full max-w-[340px]">
          <div className="relative flex w-full items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full h-9.5 pl-4 pr-10 text-xs sm:text-sm bg-[var(--search-area-bg)] text-[var(--main-color)] placeholder:text-[var(--secondary-color)] rounded-full border border-black/5 dark:border-white/10 shadow-[0_2px_6px_0_rgba(136,148,171,0.15)] dark:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
            />
            <Search className="absolute right-3.5 h-4 w-4 text-[var(--secondary-color)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Center/Right: Visual Theme Preset Switcher (Default, Glass, Glow, Retro) */}
      <div className="hidden md:flex items-center space-x-1 bg-[var(--app-container)] p-1 rounded-2xl border border-[var(--message-box-border)] shadow-2xs">
        {presets.map((item) => {
          const isActive = preset === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChangePreset(item.id)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer select-none',
                isActive
                  ? 'bg-primary text-white shadow-sm scale-102'
                  : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Right: Theme Toggle, Add Action, Notifications & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeSwitcher isDark={isDark} onToggle={onToggleTheme} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="iconSm"
                onClick={onOpenNewProject}
                className="rounded-full bg-[var(--button-bg)] hover:opacity-90 text-white shadow-sm cursor-pointer"
                title="Add New Project"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add New Project</p>
            </TooltipContent>
          </Tooltip>

          {/* Notifications Popover */}
          <NotificationsPopover />
        </TooltipProvider>

        {/* User Profile */}
        <div className="flex items-center pl-3 border-l-2 border-[var(--message-box-border)] select-none cursor-pointer group">
          <Avatar
            size="sm"
            src="https://assets.codepen.io/3306515/IMG_2025.jpg"
            alt="Aybüke C."
            fallback="AC"
            className="ring-1 ring-border group-hover:scale-105 transition-transform"
          />
          <span className="ml-2 font-bold text-sm text-[var(--main-color)] hidden xl:inline-block">
            Aybüke C.
          </span>
        </div>

        {/* Mobile Messages Toggle Button */}
        <button
          onClick={onToggleMessagesMobile}
          className="lg:hidden p-2 rounded-xl bg-[var(--search-area-bg)] text-[var(--main-color)] shadow-xs hover:bg-[var(--message-box-hover)] transition-colors cursor-pointer"
          title="Toggle Messages"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
