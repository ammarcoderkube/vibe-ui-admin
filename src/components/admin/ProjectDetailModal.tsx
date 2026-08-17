import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Project } from '../../types/dashboard'
import { Progress } from '../ui/progress'
import { Avatar } from '../ui/avatar'
import { CheckCircle2, Clock, Calendar, Users } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onUpdateProject: (updated: Project) => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateProject,
}) => {
  if (!project) return null

  const handleProgressChange = (newVal: number) => {
    const isCompleted = newVal >= 100
    onUpdateProject({
      ...project,
      progress: newVal,
      daysLeft: isCompleted ? 'Completed' : project.daysLeft,
      status: isCompleted ? 'completed' : 'in-progress',
    })
  }

  const handleToggleComplete = () => {
    const isNowComplete = project.progress < 100
    onUpdateProject({
      ...project,
      progress: isNowComplete ? 100 : 50,
      daysLeft: isNowComplete ? 'Completed' : '2 Days Left',
      status: isNowComplete ? 'completed' : 'in-progress',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.progressBarColor }}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary-color)]">
              {project.category}
            </span>
          </div>
          <DialogTitle className="text-2xl mt-1">{project.title}</DialogTitle>
          <DialogDescription>
            Detailed project overview, milestones, and team assignments.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Card Preview Banner */}
          <div
            className="p-5 rounded-2xl flex items-center justify-between border border-black/5 dark:border-white/10"
            style={{ backgroundColor: project.cardBgColor }}
          >
            <div>
              <span className="text-xs font-semibold text-zinc-700">Timeline</span>
              <p className="text-sm font-bold text-zinc-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4" />
                {project.date}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-zinc-700">Status</span>
              <p
                className="text-sm font-bold flex items-center gap-1 mt-0.5"
                style={{ color: project.statusColor }}
              >
                <Clock className="w-4 h-4" />
                {project.daysLeft}
              </p>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="bg-[var(--modal-input-bg)] p-4 rounded-2xl border border-[var(--modal-border)] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--main-color)]">
              <span>Sprint Progress</span>
              <span
                className="text-sm font-extrabold"
                style={{ color: project.progressBarColor }}
              >
                {project.progress}%
              </span>
            </div>
            <Progress
              value={project.progress}
              indicatorColor={project.progressBarColor}
              className="h-2 bg-slate-200 dark:bg-slate-700"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={project.progress}
              onChange={(e) => handleProgressChange(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer mt-2"
            />
          </div>

          {/* Team Members */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--main-color)] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Assigned Team ({project.participants.length})
              </label>
            </div>
            <div className="flex items-center space-x-3">
              {project.participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center space-x-2 bg-[var(--modal-input-bg)] px-3 py-1.5 rounded-full border border-[var(--modal-border)]"
                >
                  <Avatar size="xs" src={p.avatar} alt={p.name} />
                  <span className="text-xs font-bold text-[var(--main-color)]">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-[var(--modal-border)] text-[var(--main-color)]"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="glow"
            onClick={handleToggleComplete}
            className="bg-primary hover:bg-primary/90 text-white font-bold"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {project.progress >= 100 ? 'Mark In-Progress' : 'Mark Completed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
