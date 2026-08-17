import React, { useState } from 'react'
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

interface NewProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onAddProject: (project: Project) => void
}

const colorPresets = [
  { name: 'Peach Warmth', bg: '#fee4cb', bar: '#ff942e', darkBg: '#2a221b', darkBar: '#ff942e' },
  { name: 'Lavender Glow', bg: '#e9e7fd', bar: '#4f3ff0', darkBg: '#221f3b', darkBar: '#818cf8' },
  { name: 'Sky Cyan', bg: '#dbf6fd', bar: '#096c86', darkBg: '#152b36', darkBar: '#38bdf8' },
  { name: 'Pink Rose', bg: '#ffd3e2', bar: '#df3670', darkBg: '#331924', darkBar: '#f43f5e' },
  { name: 'Mint Emerald', bg: '#c8f7dc', bar: '#34c471', darkBg: '#142d20', darkBar: '#34d399' },
  { name: 'Periwinkle Indigo', bg: '#d5deff', bar: '#4067f9', darkBg: '#1c243d', darkBar: '#60a5fa' },
]

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Prototyping')
  const [progress, setProgress] = useState(30)
  const [selectedColor, setSelectedColor] = useState(colorPresets[0])
  const [daysLeft, setDaysLeft] = useState('3 Days Left')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newProject: Project = {
      id: `p-${Date.now()}`,
      date: 'December 12, 2020',
      title: title.trim(),
      category: category.trim() || 'Prototyping',
      progress: Number(progress) || 0,
      progressBarColor: selectedColor.bar,
      cardBgColor: selectedColor.bg,
      daysLeft: daysLeft.trim() || '2 Days Left',
      statusColor: selectedColor.bar,
      status: 'in-progress',
      participants: [
        {
          id: 'user-default',
          name: 'Aybüke C.',
          avatar: 'https://assets.codepen.io/3306515/IMG_2025.jpg',
        },
      ],
    }

    onAddProject(newProject)
    setTitle('')
    setProgress(30)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project card to your portfolio dashboard with Vibe UI styling.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-5">
            {/* Project Title */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--main-color)]">
                Project Title
              </label>
              <input
                type="text"
                placeholder="e.g. Mobile App Redesign"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--modal-input-bg)] text-[var(--main-color)] border border-[var(--modal-border)] placeholder:text-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Category and Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--main-color)]">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prototyping"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--modal-input-bg)] text-[var(--main-color)] border border-[var(--modal-border)] placeholder:text-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--main-color)]">
                  Due Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 Days Left"
                  value={daysLeft}
                  onChange={(e) => setDaysLeft(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--modal-input-bg)] text-[var(--main-color)] border border-[var(--modal-border)] placeholder:text-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Progress */}
            <div className="flex flex-col space-y-2 bg-[var(--modal-input-bg)] p-3.5 rounded-xl border border-[var(--modal-border)]">
              <div className="flex justify-between text-xs font-bold text-[var(--main-color)]">
                <span>Initial Progress</span>
                <span className="text-primary font-bold">{progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Theme Preset Picker */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--main-color)]">
                Theme Color Preset
              </label>
              <div className="grid grid-cols-6 gap-2">
                {colorPresets.map((preset, idx) => {
                  const isSelected = selectedColor.name === preset.name
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(preset)}
                      className="h-10 rounded-xl flex items-center justify-center transition-all relative cursor-pointer border-2 shadow-xs hover:scale-105"
                      style={{
                        backgroundColor: preset.bg,
                        borderColor: isSelected ? preset.bar : 'rgba(0,0,0,0.1)',
                      }}
                      title={preset.name}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-xs"
                        style={{ backgroundColor: preset.bar }}
                      />
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary ring-2 ring-white" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[var(--modal-border)] text-[var(--main-color)] hover:bg-[var(--modal-input-bg)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="glow"
              className="bg-primary hover:bg-primary/90 text-white font-bold"
            >
              Add Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
