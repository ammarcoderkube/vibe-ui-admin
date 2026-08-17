import React from 'react'
import { TrendingUp, CheckCircle, Clock, Zap, ArrowUpRight } from 'lucide-react'

export const AnalyticsView: React.FC = () => {
  const metrics = [
    {
      title: 'Weekly Velocity',
      value: '42.8 pts',
      change: '+14.2%',
      bg: '#fee4cb',
      bar: '#ff942e',
      icon: TrendingUp,
    },
    {
      title: 'Completion Rate',
      value: '91.4%',
      change: '+6.8%',
      bg: '#e9e7fd',
      bar: '#4f3ff0',
      icon: CheckCircle,
    },
    {
      title: 'Avg. Turnaround',
      value: '3.2 Days',
      change: '-18.0%',
      bg: '#dbf6fd',
      bar: '#096c86',
      icon: Clock,
    },
    {
      title: 'Sprint Efficiency',
      value: '98.2%',
      change: '+4.5%',
      bg: '#c8f7dc',
      bar: '#34c471',
      icon: Zap,
    },
  ]

  const chartData = [
    { day: 'Mon', completed: 6, planned: 8, height: 60 },
    { day: 'Tue', completed: 9, planned: 10, height: 85 },
    { day: 'Wed', completed: 12, planned: 12, height: 100 },
    { day: 'Thu', completed: 8, planned: 9, height: 75 },
    { day: 'Fri', completed: 11, planned: 11, height: 95 },
    { day: 'Sat', completed: 4, planned: 5, height: 40 },
    { day: 'Sun', completed: 2, planned: 3, height: 25 },
  ]

  return (
    <div className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-y-auto shadow-sm transition-colors duration-200 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--main-color)]">
            Analytics & Insights
          </h2>
          <p className="text-xs text-[var(--secondary-color)] font-medium mt-1">
            Performance metrics, team capacity, and sprint velocity overview.
          </p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--inner-card-bg)] text-[var(--main-color)] flex items-center gap-1 border border-[var(--message-box-border)]">
          <span>This Month</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon
          return (
            <div
              key={i}
              className="p-5 rounded-[24px] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 border border-black/5 dark:border-white/10"
              style={{ backgroundColor: m.bg }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-700">{m.title}</span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 shadow-xs"
                  style={{ color: m.bar }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-zinc-900">{m.value}</h3>
                <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-800">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{m.change} vs last month</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity Bar Chart */}
        <div className="lg:col-span-2 bg-[var(--inner-card-bg)] p-6 rounded-[28px] border border-[var(--message-box-border)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[var(--main-color)]">
              Weekly Task Delivery
            </h3>
            <div className="flex items-center space-x-4 text-xs font-bold text-[var(--secondary-color)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                Target
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between h-48 pt-6 px-2">
            {chartData.map((d, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full max-w-[32px] bg-slate-200 dark:bg-slate-800/80 rounded-t-xl h-40 flex items-end justify-center p-1 relative">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${d.height}%` }}
                  />
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--modal-bg)] text-[var(--main-color)] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-[var(--modal-border)]">
                    {d.completed}
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--secondary-color)]">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Distribution Breakdown */}
        <div className="bg-[var(--inner-card-bg)] p-6 rounded-[28px] border border-[var(--message-box-border)] flex flex-col justify-between">
          <h3 className="text-base font-bold text-[var(--main-color)] mb-4">
            Category Allocation
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Web Designing', share: '40%', color: '#ff942e' },
              { name: 'UI Development', share: '25%', color: '#df3670' },
              { name: 'Testing & QA', share: '20%', color: '#4f3ff0' },
              { name: 'Data Analysis', share: '15%', color: '#34c471' },
            ].map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-[var(--main-color)]">
                  <span>{cat.name}</span>
                  <span>{cat.share}</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: cat.share, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-2xl bg-[var(--modal-bg)] border border-[var(--message-box-border)] text-center">
            <span className="text-xs font-bold text-primary">
              ⚡ All 4 sprint targets on schedule
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
