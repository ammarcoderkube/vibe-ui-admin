import React from 'react'
import { Star, X } from 'lucide-react'
import { ClientMessage } from '../../types/dashboard'
import { Avatar } from '../ui/avatar'
import { cn } from '../../lib/utils'

interface MessagesSectionProps {
  messages: ClientMessage[]
  isOpenMobile: boolean
  onCloseMobile: () => void
  onToggleStar: (id: string) => void
}

export const MessagesSection: React.FC<MessagesSectionProps> = ({
  messages,
  isOpenMobile,
  onCloseMobile,
  onToggleStar,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'bg-[var(--projects-section)] rounded-[30px] p-6 flex flex-col h-full overflow-hidden shadow-sm transition-all duration-300 z-40',
          // Desktop sizing
          'w-80 lg:w-88 shrink-0',
          // Mobile Drawer overlay styles
          'fixed top-0 right-0 bottom-0 max-w-[85vw] rounded-l-[30px] rounded-r-none lg:static lg:rounded-[30px]',
          isOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--message-box-border)] shrink-0 relative">
          <h3 className="text-xl font-bold text-[var(--main-color)]">Client Messages</h3>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-full hover:bg-[var(--app-container)] text-[var(--secondary-color)] hover:text-[var(--main-color)] lg:hidden cursor-pointer"
            title="Close Messages"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--message-box-border)] -mx-2 px-2 mt-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="py-4 flex items-start space-x-3 group hover:bg-[var(--message-box-hover)] rounded-2xl px-2 transition-colors duration-150"
            >
              <Avatar
                size="md"
                src={msg.avatar}
                alt={msg.name}
                fallback={msg.name}
                className="shrink-0 mt-0.5"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-[var(--main-color)] truncate">
                    {msg.name}
                  </h4>
                  <button
                    onClick={() => onToggleStar(msg.id)}
                    className="p-1 text-[var(--secondary-color)] hover:text-[var(--star)] transition-colors cursor-pointer"
                    title={msg.isStarred ? 'Unstar Message' : 'Star Message'}
                  >
                    <Star
                      className={cn(
                        'h-4 w-4 transition-transform duration-200 active:scale-125',
                        msg.isStarred
                          ? 'fill-[var(--star)] text-[var(--star)]'
                          : 'text-[var(--secondary-color)] opacity-50'
                      )}
                    />
                  </button>
                </div>

                <p className="text-xs text-[var(--secondary-color)] leading-relaxed line-clamp-3 mb-1.5">
                  {msg.message}
                </p>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-[var(--secondary-color)] opacity-80">
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
