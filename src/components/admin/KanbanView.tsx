import React, { useState } from 'react'
import { Plus, MoreHorizontal, MessageSquare, CheckSquare, Clock, ArrowRight } from 'lucide-react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'

interface KanbanCard {
  id: string
  title: string
  category: string
  priority: 'High' | 'Medium' | 'Low'
  priorityColor: string
  bg: string
  bar: string
  comments: number
  tasks: { done: number; total: number }
  avatars: string[]
  daysLeft: string
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export const KanbanView: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'col-todo',
      title: 'Backlog & To Do',
      cards: [
        {
          id: 'k-1',
          title: 'Design System Tokens v4',
          category: 'UI/UX Design',
          priority: 'High',
          priorityColor: '#ef4444',
          bg: '#fee4cb',
          bar: '#ff942e',
          comments: 4,
          tasks: { done: 2, total: 6 },
          avatars: [
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80',
          ],
          daysLeft: '5 Days',
        },
        {
          id: 'k-2',
          title: 'Client Review Prep',
          category: 'Prototyping',
          priority: 'Medium',
          priorityColor: '#f59e0b',
          bg: '#e9e7fd',
          bar: '#4f3ff0',
          comments: 1,
          tasks: { done: 0, total: 3 },
          avatars: [
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=120&h=120&fit=crop&q=80',
          ],
          daysLeft: '6 Days',
        },
      ],
    },
    {
      id: 'col-progress',
      title: 'In Progress',
      cards: [
        {
          id: 'k-3',
          title: 'Micro-Interactions Animation',
          category: 'Prototyping',
          priority: 'High',
          priorityColor: '#ef4444',
          bg: '#dbf6fd',
          bar: '#096c86',
          comments: 8,
          tasks: { done: 4, total: 5 },
          avatars: [
            'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=120&h=120&fit=crop&q=80',
            'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=120&h=120&fit=crop&q=80',
          ],
          daysLeft: '2 Days',
        },
      ],
    },
    {
      id: 'col-review',
      title: 'Code & QA Review',
      cards: [
        {
          id: 'k-4',
          title: 'Tailwind v4 Integration Tests',
          category: 'QA Testing',
          priority: 'Medium',
          priorityColor: '#f59e0b',
          bg: '#ffd3e2',
          bar: '#df3670',
          comments: 3,
          tasks: { done: 7, total: 8 },
          avatars: [
            'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=120&h=120&fit=crop&q=80',
          ],
          daysLeft: '1 Day',
        },
      ],
    },
    {
      id: 'col-done',
      title: 'Completed',
      cards: [
        {
          id: 'k-5',
          title: 'Dark Theme Color Hierarchy',
          category: 'Architecture',
          priority: 'Low',
          priorityColor: '#10b981',
          bg: '#c8f7dc',
          bar: '#34c471',
          comments: 6,
          tasks: { done: 5, total: 5 },
          avatars: [
            'https://assets.codepen.io/3306515/IMG_2025.jpg',
          ],
          daysLeft: 'Done',
        },
      ],
    },
  ])

  // Move card forward
  const moveCardForward = (colIndex: number, cardIndex: number) => {
    if (colIndex >= columns.length - 1) return
    const card = columns[colIndex].cards[cardIndex]
    setColumns((prev) => {
      const copy = prev.map((col) => ({ ...col, cards: [...col.cards] }))
      copy[colIndex].cards = copy[colIndex].cards.filter((_, idx) => idx !== cardIndex)
      copy[colIndex + 1].cards.unshift(card)
      return copy
    })
  }

  return (
    <div className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-hidden shadow-sm transition-colors duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--message-box-border)] shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-[var(--main-color)]">
            Sprint Kanban Board
          </h2>
          <p className="text-xs text-[var(--secondary-color)] font-medium mt-1">
            Active sprints, task velocity, and workflow status cards.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="glow" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1" /> New Task Ticket
          </Button>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 flex-1 overflow-x-auto overflow-y-hidden pt-6">
        {columns.map((col, colIdx) => (
          <div
            key={col.id}
            className="flex flex-col h-full bg-[var(--inner-card-bg)] p-4 rounded-[26px] border border-[var(--message-box-border)]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--message-box-border)] shrink-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs text-[var(--main-color)]">
                  {col.title}
                </span>
                <span className="w-5 h-5 rounded-full bg-[var(--modal-bg)] text-[var(--main-color)] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {col.cards.length}
                </span>
              </div>
              <button className="text-[var(--secondary-color)] hover:text-[var(--main-color)] p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Cards Column Feed */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {col.cards.map((card, cardIdx) => (
                <div
                  key={card.id}
                  className="p-4 rounded-[22px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md border border-black/5 dark:border-white/10 group cursor-pointer"
                  style={{ backgroundColor: card.bg }}
                >
                  {/* Category & Priority */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-wider">
                      {card.category}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-extrabold text-white"
                      style={{ backgroundColor: card.priorityColor }}
                    >
                      {card.priority}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-sm text-zinc-900 leading-snug mb-3">
                    {card.title}
                  </h4>

                  {/* Task checklist & comments */}
                  <div className="flex items-center space-x-3 text-xs font-semibold text-zinc-700 mb-3">
                    <span className="flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5" />
                      {card.tasks.done}/{card.tasks.total}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {card.comments}
                    </span>
                  </div>

                  {/* Footer: Avatars, Days, Move Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/60">
                    <div className="flex -space-x-1.5">
                      {card.avatars.map((av, i) => (
                        <Avatar
                          key={i}
                          size="xs"
                          src={av}
                          className="border border-white ring-0"
                        />
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold text-zinc-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {card.daysLeft}
                      </span>
                      {colIdx < columns.length - 1 && (
                        <button
                          onClick={() => moveCardForward(colIdx, cardIdx)}
                          className="p-1 rounded-full bg-white/80 hover:bg-white text-zinc-900 transition-transform active:scale-90 shadow-2xs cursor-pointer"
                          title="Move to Next Stage"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
