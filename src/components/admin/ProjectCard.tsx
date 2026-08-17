import React from 'react'
import { MoreVertical, Plus, Trash2, CheckCircle2, Copy } from 'lucide-react'
import { Project } from '../../types/dashboard'
import { Progress } from '../ui/progress'
import { Avatar } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { cn } from '../../lib/utils'

interface ProjectCardProps {
  project: Project
  viewMode: 'grid' | 'list'
  onClick?: () => void
  onDelete?: (id: string) => void
  onToggleStatus?: (id: string) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewMode,
  onClick,
  onDelete,
  onToggleStatus,
}) => {
  const isGrid = viewMode === 'grid'

  if (!isGrid) {
    // List View Row
    return (
      <div
        onClick={onClick}
        className="w-full p-4 rounded-2xl mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 hover:shadow-md border border-black/5 dark:border-white/10 cursor-pointer"
        style={{ backgroundColor: project.cardBgColor }}
      >
        <div className="flex items-center space-x-4 min-w-[180px]">
          <div className="flex flex-col">
            <h4 className="font-bold text-zinc-900 text-base">{project.title}</h4>
            <span className="text-xs text-zinc-700 font-medium">{project.category}</span>
          </div>
        </div>

        <div className="text-xs text-zinc-700 font-medium min-w-[120px]">
          <span>{project.date}</span>
        </div>

        <div className="flex-1 max-w-xs min-w-[140px]">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-900 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress
            value={project.progress}
            indicatorColor={project.progressBarColor}
            className="h-1.5 bg-white/80"
          />
        </div>

        {/* Participants */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {project.participants.map((p) => (
              <Avatar
                key={p.id}
                size="xs"
                src={p.avatar}
                alt={p.name}
                className="border border-white ring-0"
              />
            ))}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="ml-2 w-5 h-5 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-zinc-800 text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
            style={{ color: project.statusColor }}
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>

        {/* Days Left */}
        <div
          className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 shrink-0 text-center select-none shadow-xs"
          style={{ color: project.statusColor }}
        >
          {project.daysLeft}
        </div>

        {/* Actions Dropdown */}
        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-full text-zinc-800 hover:bg-white/70 transition-colors cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--modal-bg)] text-[var(--main-color)] border-[var(--modal-border)]">
              <DropdownMenuItem onClick={() => onToggleStatus?.(project.id)}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>{project.progress >= 100 ? 'Mark In-Progress' : 'Mark as Completed'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(project.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  // Grid View Card
  return (
    <div
      onClick={onClick}
      className={cn(
        'group rounded-[30px] p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative select-none border border-black/5 dark:border-white/10 cursor-pointer'
      )}
      style={{ backgroundColor: project.cardBgColor }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-zinc-700">
          {project.date}
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full text-zinc-800 hover:bg-white/60 transition-colors cursor-pointer">
                <MoreVertical className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--modal-bg)] text-[var(--main-color)] border-[var(--modal-border)]">
              <DropdownMenuItem onClick={() => onToggleStatus?.(project.id)}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                <span>{project.progress >= 100 ? 'Mark In-Progress' : 'Mark as Completed'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(project.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Header */}
      <div className="text-center my-2">
        <h4 className="font-bold text-zinc-900 text-base leading-snug">
          {project.title}
        </h4>
        <p className="text-xs text-zinc-700 font-semibold mt-0.5">
          {project.category}
        </p>
      </div>

      {/* Progress */}
      <div className="my-4">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-1.5">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <Progress
          value={project.progress}
          indicatorColor={project.progressBarColor}
          className="h-1.5 bg-white/90"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/60">
        {/* Participants */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {project.participants.map((p) => (
              <Avatar
                key={p.id}
                size="xs"
                src={p.avatar}
                alt={p.name}
                className="border border-white shadow-2xs ring-0"
              />
            ))}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="ml-1.5 w-5 h-5 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-zinc-800 text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
            style={{ color: project.statusColor }}
            title="Add Participant"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>

        {/* Days Left Badge */}
        <div
          className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/80 shadow-xs tracking-tight select-none"
          style={{ color: project.statusColor }}
        >
          {project.daysLeft}
        </div>
      </div>
    </div>
  )
}
