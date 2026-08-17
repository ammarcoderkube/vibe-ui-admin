export type ThemePreset = 'default' | 'glass' | 'glow' | 'retro'

export interface Participant {
  id: string
  name: string
  avatar: string
}

export interface Project {
  id: string
  date: string
  title: string
  category: string
  progress: number
  progressBarColor: string
  cardBgColor: string
  daysLeft: string
  statusColor: string
  participants: Participant[]
  status: 'in-progress' | 'upcoming' | 'completed'
}

export interface ClientMessage {
  id: string
  name: string
  avatar: string
  message: string
  time: string
  isStarred: boolean
}

export interface DashboardStats {
  inProgress: number
  upcoming: number
  total: number
}
