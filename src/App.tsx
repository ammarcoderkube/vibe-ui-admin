import { useState, useEffect, useMemo } from 'react'
import { Header } from './components/admin/Header'
import { Sidebar, NavItemKey } from './components/admin/Sidebar'
import { ProjectsSection } from './components/admin/ProjectsSection'
import { MessagesSection } from './components/admin/MessagesSection'
import { NewProjectModal } from './components/admin/NewProjectModal'
import { ProjectDetailModal } from './components/admin/ProjectDetailModal'
import { KanbanView } from './components/admin/KanbanView'
import { TeamView } from './components/admin/TeamView'
import { ComponentsShowcaseView } from './components/admin/ComponentsShowcaseView'
import { AnalyticsView } from './components/admin/AnalyticsView'
import { CalendarView } from './components/admin/CalendarView'
import { SettingsView } from './components/admin/SettingsView'
import { initialProjects, initialMessages } from './data/mockData'
import { Project, ClientMessage, DashboardStats, ThemePreset } from './types/dashboard'

export default function App() {
  // Dark/Light Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vibe_theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('vibe_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('vibe_theme', 'light')
    }
  }, [isDark])

  // Visual Theme Preset State (default, glass, glow, retro)
  const [preset, setPreset] = useState<ThemePreset>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vibe_preset') as ThemePreset | null
      if (saved && ['default', 'glass', 'glow', 'retro'].includes(saved)) {
        return saved
      }
    }
    return 'default'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-preset', preset)
    localStorage.setItem('vibe_preset', preset)
  }, [preset])

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavItemKey>('home')

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Projects State
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Messages State
  const [messages, setMessages] = useState<ClientMessage[]>(initialMessages)
  const [isMessagesMobileOpen, setIsMessagesMobileOpen] = useState(false)

  // Modal State
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)

  // Handlers
  const handleToggleTheme = () => setIsDark((prev) => !prev)

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev])
  }

  const handleUpdateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setSelectedProject(updated)
  }

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    if (selectedProject?.id === id) {
      setSelectedProject(null)
    }
  }

  const handleToggleProjectStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextProgress = p.progress >= 100 ? 50 : 100
          return {
            ...p,
            progress: nextProgress,
            daysLeft: nextProgress >= 100 ? 'Completed' : '2 Days Left',
            status: nextProgress >= 100 ? 'completed' : 'in-progress',
          }
        }
        return p
      })
    )
  }

  const handleToggleStarMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    )
  }

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects
    const q = searchQuery.toLowerCase()
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [projects, searchQuery])

  // Stats
  const stats: DashboardStats = useMemo(() => {
    const inProgress = projects.filter((p) => p.status === 'in-progress').length
    const upcoming = projects.filter((p) => p.status === 'upcoming').length
    return {
      inProgress,
      upcoming,
      total: projects.length,
    }
  }, [projects])

  return (
    <div
      data-preset={preset}
      className="flex flex-col h-screen w-full bg-[var(--app-container)] text-[var(--main-color)] transition-colors duration-200 overflow-hidden select-none"
    >
      {/* Top Navigation Header with Preset Switcher */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        preset={preset}
        onChangePreset={setPreset}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        onToggleMessagesMobile={() => setIsMessagesMobileOpen((prev) => !prev)}
      />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden px-4 sm:px-6 pb-4 sm:pb-6 gap-4 sm:gap-6">
        {/* Left Navigation Sidebar */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Center Main Views */}
        {activeTab === 'home' && (
          <>
            <ProjectsSection
              projects={filteredProjects}
              stats={stats}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              onDeleteProject={handleDeleteProject}
              onToggleStatus={handleToggleProjectStatus}
              onSelectProject={setSelectedProject}
            />

            {/* Right Client Messages Sidebar */}
            <MessagesSection
              messages={messages}
              isOpenMobile={isMessagesMobileOpen}
              onCloseMobile={() => setIsMessagesMobileOpen(false)}
              onToggleStar={handleToggleStarMessage}
            />
          </>
        )}

        {activeTab === 'kanban' && <KanbanView />}

        {activeTab === 'team' && <TeamView />}

        {activeTab === 'components' && <ComponentsShowcaseView />}

        {activeTab === 'analytics' && <AnalyticsView />}

        {activeTab === 'calendar' && <CalendarView />}

        {activeTab === 'settings' && <SettingsView />}
      </div>

      {/* Add New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Project Detail & Edit Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onUpdateProject={handleUpdateProject}
      />
    </div>
  )
}
