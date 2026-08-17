import React, { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { Project, DashboardStats } from '../../types/dashboard'
import { ProjectCard } from './ProjectCard'
import { cn } from '../../lib/utils'

interface ProjectsSectionProps {
  projects: Project[]
  stats: DashboardStats
  viewMode: 'grid' | 'list'
  onChangeViewMode: (mode: 'grid' | 'list') => void
  onDeleteProject: (id: string) => void
  onToggleStatus: (id: string) => void
  onSelectProject?: (project: Project) => void
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  stats,
  viewMode,
  onChangeViewMode,
  onDeleteProject,
  onToggleStatus,
  onSelectProject,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'upcoming'>('all')

  const displayedProjects = projects.filter((p) => {
    if (filterStatus === 'all') return true
    return p.status === filterStatus
  })

  return (
    <section className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-hidden shadow-sm transition-colors duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-[var(--main-color)]">Projects</h2>
        <span className="text-lg font-bold text-[var(--main-color)] opacity-90">
          December, 12
        </span>
      </div>

      {/* Stats & View Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 shrink-0 border-b border-[var(--message-box-border)] mb-4">
        {/* Status Metrics (Clickable interactive filter pills) */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <button
            onClick={() => setFilterStatus(filterStatus === 'in-progress' ? 'all' : 'in-progress')}
            className={cn(
              'flex flex-col text-left transition-opacity cursor-pointer',
              filterStatus === 'in-progress' ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
            )}
          >
            <span className="text-2xl font-bold text-[var(--main-color)] leading-tight">
              {stats.inProgress}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-[var(--secondary-color)]">
                In Progress
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)] opacity-60 hidden sm:inline-block" />
            </div>
          </button>

          <button
            onClick={() => setFilterStatus(filterStatus === 'upcoming' ? 'all' : 'upcoming')}
            className={cn(
              'flex flex-col text-left transition-opacity cursor-pointer',
              filterStatus === 'upcoming' ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
            )}
          >
            <span className="text-2xl font-bold text-[var(--main-color)] leading-tight">
              {stats.upcoming}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-[var(--secondary-color)]">
                Upcoming
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-color)] opacity-60 hidden sm:inline-block" />
            </div>
          </button>

          <button
            onClick={() => setFilterStatus('all')}
            className={cn(
              'flex flex-col text-left transition-opacity cursor-pointer',
              filterStatus === 'all' ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
            )}
          >
            <span className="text-2xl font-bold text-[var(--main-color)] leading-tight">
              {stats.total}
            </span>
            <span className="text-xs font-medium text-[var(--secondary-color)]">
              Total Projects
            </span>
          </button>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center space-x-1.5 self-end sm:self-auto bg-[var(--app-container)] p-1 rounded-xl">
          <button
            onClick={() => onChangeViewMode('list')}
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer',
              viewMode === 'list'
                ? 'bg-[var(--link-color-active-bg)] text-[var(--link-color-active)] shadow-xs'
                : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
            )}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onChangeViewMode('grid')}
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer',
              viewMode === 'grid'
                ? 'bg-[var(--link-color-active-bg)] text-[var(--link-color-active)] shadow-xs'
                : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
            )}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Projects Grid / List Container */}
      <div className="flex-1 overflow-y-auto pr-1">
        {displayedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-[var(--secondary-color)] text-center">
            <p className="text-sm font-medium">No projects found matching the filter.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode="grid"
                onClick={() => onSelectProject?.(project)}
                onDelete={onDeleteProject}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col pb-4">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode="list"
                onClick={() => onSelectProject?.(project)}
                onDelete={onDeleteProject}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
