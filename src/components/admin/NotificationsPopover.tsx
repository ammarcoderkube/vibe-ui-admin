import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Bell, CheckCheck, Clock, MessageSquare, Sparkles } from 'lucide-react'

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  unread: boolean
  icon: React.ReactNode
}

interface NotificationsPopoverProps {
  children?: React.ReactNode
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ children }) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'New Feedback on Web Designing',
      description: 'Stephanie sent a positive review on the prototype.',
      time: '10m ago',
      unread: true,
      icon: <MessageSquare className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 'n-2',
      title: 'Deadline Approaching',
      description: 'Svg Animations is due in 2 days.',
      time: '1h ago',
      unread: true,
      icon: <Clock className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 'n-3',
      title: 'Project Completed',
      description: 'Data Analysis achieved 100% milestone.',
      time: '4h ago',
      unread: false,
      icon: <Sparkles className="h-4 w-4 text-emerald-500" />,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || (
          <button
            className="p-1.5 rounded-full text-[var(--main-color)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-[var(--app-container)] animate-pulse" />
            )}
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-2 bg-[var(--modal-bg)] text-[var(--main-color)] border-[var(--modal-border)] shadow-xl"
      >
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm">Notifications</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-[var(--secondary-color)] hover:text-primary flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>
        <DropdownMenuSeparator className="bg-[var(--message-box-border)]" />
        <div className="max-h-72 overflow-y-auto space-y-1">
          {notifications.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--message-box-hover)] cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-[var(--app-container)] shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs truncate">{item.title}</p>
                  {item.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 ml-1" />
                  )}
                </div>
                <p className="text-[11px] text-[var(--secondary-color)] line-clamp-2 mt-0.5">
                  {item.description}
                </p>
                <span className="text-[10px] text-[var(--secondary-color)] opacity-70 mt-1 block">
                  {item.time}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
