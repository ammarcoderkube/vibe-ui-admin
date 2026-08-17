import React from 'react'
import { Home, Columns3, Users, Sparkles, PieChart, Calendar, Settings } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { cn } from '../../lib/utils'

export type NavItemKey =
  | 'home'
  | 'kanban'
  | 'team'
  | 'components'
  | 'analytics'
  | 'calendar'
  | 'settings'

interface SidebarProps {
  activeTab: NavItemKey
  onSelectTab: (tab: NavItemKey) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { key: 'home' as NavItemKey, label: 'Dashboard', icon: Home },
    { key: 'kanban' as NavItemKey, label: 'Sprint Kanban', icon: Columns3 },
    { key: 'team' as NavItemKey, label: 'Team Members', icon: Users },
    { key: 'components' as NavItemKey, label: 'Vibe UI Components', icon: Sparkles },
    { key: 'analytics' as NavItemKey, label: 'Analytics & Insights', icon: PieChart },
    { key: 'calendar' as NavItemKey, label: 'Calendar & Deadlines', icon: Calendar },
    { key: 'settings' as NavItemKey, label: 'Settings & Presets', icon: Settings },
  ]

  return (
    <aside className="hidden md:flex flex-col items-center py-6 px-3 shrink-0 select-none">
      <TooltipProvider delayDuration={150}>
        <div className="flex flex-col items-center space-y-4">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectTab(key)}
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'bg-[var(--link-color-active-bg)] text-[var(--link-color-active)] shadow-md scale-105'
                        : 'text-[var(--link-color)] hover:bg-[var(--link-color-hover)] hover:text-[var(--main-color)]'
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="sr-only">{label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </aside>
  )
}
