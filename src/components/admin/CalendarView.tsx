import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '../ui/button'

export const CalendarView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(12)

  const scheduledEvents = [
    { day: 10, title: 'Web Designing Kickoff', color: '#ff942e', bg: '#fee4cb' },
    { day: 12, title: 'Testing Sprint Review', color: '#4f3ff0', bg: '#e9e7fd' },
    { day: 15, title: 'Svg Animations Delivery', color: '#096c86', bg: '#dbf6fd' },
    { day: 18, title: 'UI Development Launch', color: '#df3670', bg: '#ffd3e2' },
    { day: 22, title: 'Data Analysis Report', color: '#34c471', bg: '#c8f7dc' },
  ]

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-y-auto shadow-sm transition-colors duration-200 space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--main-color)]">
            December 2026
          </h2>
          <p className="text-xs text-[var(--secondary-color)] font-medium mt-1">
            Track milestones, client deliverables, and team sync dates.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-xl bg-[var(--inner-card-bg)] hover:bg-[var(--message-box-hover)] text-[var(--main-color)] border border-[var(--message-box-border)] transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl bg-[var(--inner-card-bg)] hover:bg-[var(--message-box-hover)] text-[var(--main-color)] border border-[var(--message-box-border)] transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
          <Button variant="glow" size="sm" className="ml-2">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Milestone
          </Button>
        </div>
      </div>

      {/* Weekday Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((d) => (
          <div
            key={d}
            className="text-center py-2 text-xs font-bold text-[var(--secondary-color)] uppercase tracking-wider"
          >
            {d}
          </div>
        ))}

        {/* Empty slots for 1st day offset */}
        <div className="h-24 rounded-2xl bg-[var(--inner-card-bg)] border border-dashed border-[var(--message-box-border)] opacity-30" />
        <div className="h-24 rounded-2xl bg-[var(--inner-card-bg)] border border-dashed border-[var(--message-box-border)] opacity-30" />

        {/* Days */}
        {days.map((day) => {
          const events = scheduledEvents.filter((e) => e.day === day)
          const isSelected = selectedDay === day
          const isToday = day === 12

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-24 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-primary bg-[var(--inner-card-bg)] ring-2 ring-primary/30 shadow-sm'
                  : 'border-[var(--message-box-border)] bg-[var(--inner-card-bg)] hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    isToday
                      ? 'bg-primary text-white'
                      : 'text-[var(--main-color)]'
                  }`}
                >
                  {day}
                </span>
                {events.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Event Pill */}
              <div className="space-y-1 overflow-hidden">
                {events.map((ev, i) => (
                  <div
                    key={i}
                    className="px-1.5 py-0.5 rounded-md text-[10px] font-bold text-zinc-900 truncate"
                    style={{ backgroundColor: ev.bg }}
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
