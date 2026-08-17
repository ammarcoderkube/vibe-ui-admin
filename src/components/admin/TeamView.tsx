import React, { useState } from 'react'
import { Plus, Mail, MessageCircle, MoreVertical, Briefcase, Award } from 'lucide-react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: 'Online' | 'In Meeting' | 'Focus Mode' | 'Away'
  statusColor: string
  activeProjects: number
  workload: number
  skills: string[]
  email: string
  bg: string
  bar: string
}

export const TeamView: React.FC = () => {
  const [members] = useState<TeamMember[]>([
    {
      id: 'tm-1',
      name: 'Aybüke C.',
      role: 'Lead UI/UX Designer',
      avatar: 'https://assets.codepen.io/3306515/IMG_2025.jpg',
      status: 'Online',
      statusColor: '#10b981',
      activeProjects: 4,
      workload: 85,
      skills: ['Figma', 'Prototyping', 'Design Systems', 'Tailwind v4'],
      email: 'aybuke@portfolio.design',
      bg: '#fee4cb',
      bar: '#ff942e',
    },
    {
      id: 'tm-2',
      name: 'Sarah Miller',
      role: 'Senior Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80',
      status: 'Focus Mode',
      statusColor: '#8b5cf6',
      activeProjects: 3,
      workload: 65,
      skills: ['React 19', 'TypeScript', 'Radix UI', 'CSS Motion'],
      email: 'sarah@vibeui.dev',
      bg: '#e9e7fd',
      bar: '#4f3ff0',
    },
    {
      id: 'tm-3',
      name: 'Alex Johnson',
      role: 'Motion & SVG Animator',
      avatar: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=120&h=120&fit=crop&q=80',
      status: 'Online',
      statusColor: '#10b981',
      activeProjects: 2,
      workload: 50,
      skills: ['GSAP', 'Lottie', 'SVG Animation', 'WebGL'],
      email: 'alex@vibeui.dev',
      bg: '#dbf6fd',
      bar: '#096c86',
    },
    {
      id: 'tm-4',
      name: 'Emily Chen',
      role: 'QA & Testing Lead',
      avatar: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=120&h=120&fit=crop&q=80',
      status: 'In Meeting',
      statusColor: '#f59e0b',
      activeProjects: 3,
      workload: 75,
      skills: ['Playwright', 'Jest', 'Accessibility', 'Storybook'],
      email: 'emily@vibeui.dev',
      bg: '#ffd3e2',
      bar: '#df3670',
    },
    {
      id: 'tm-5',
      name: 'Michael Davis',
      role: 'Fullstack Architect',
      avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=120&h=120&fit=crop&q=80',
      status: 'Away',
      statusColor: '#94a3b8',
      activeProjects: 2,
      workload: 40,
      skills: ['Node.js', 'Next.js', 'PostgreSQL', 'GraphQL'],
      email: 'michael@vibeui.dev',
      bg: '#c8f7dc',
      bar: '#34c471',
    },
    {
      id: 'tm-6',
      name: 'Chloe Martinez',
      role: 'Product Strategist',
      avatar: 'https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?w=120&h=120&fit=crop&q=80',
      status: 'Online',
      statusColor: '#10b981',
      activeProjects: 4,
      workload: 90,
      skills: ['User Research', 'Analytics', 'Sprint Planning', 'Agile'],
      email: 'chloe@vibeui.dev',
      bg: '#d5deff',
      bar: '#4067f9',
    },
  ])

  return (
    <div className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-y-auto shadow-sm transition-colors duration-200 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--message-box-border)]">
        <div>
          <h2 className="text-2xl font-bold text-[var(--main-color)]">
            Team & Collaborators
          </h2>
          <p className="text-xs text-[var(--secondary-color)] font-medium mt-1">
            Manage team assignments, capacity workloads, and member profiles.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="glow" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1" /> Invite Teammate
          </Button>
        </div>
      </div>

      {/* Team Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-[28px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-black/5 dark:border-white/10"
            style={{ backgroundColor: member.bg }}
          >
            {/* Top Row: Avatar & Status & Options */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar
                    size="md"
                    src={member.avatar}
                    alt={member.name}
                    className="border-2 border-white shadow-xs"
                  />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-2xs"
                    style={{ backgroundColor: member.statusColor }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-tight">
                    {member.name}
                  </h4>
                  <span className="text-xs font-semibold text-zinc-700">
                    {member.role}
                  </span>
                </div>
              </div>

              <button className="p-1 rounded-full text-zinc-700 hover:bg-white/60">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Workload Progress */}
            <div className="my-4 bg-white/70 p-3 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-1.5">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> Capacity
                </span>
                <span>{member.workload}%</span>
              </div>
              <Progress
                value={member.workload}
                indicatorColor={member.bar}
                className="h-1.5 bg-zinc-200"
              />
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {member.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/80 text-zinc-800 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer Action Icons */}
            <div className="flex items-center justify-between pt-3 border-t border-white/60">
              <span className="text-xs font-bold text-zinc-800 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> {member.activeProjects} Active Sprints
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  className="p-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 transition-transform active:scale-95 shadow-2xs cursor-pointer"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 transition-transform active:scale-95 shadow-2xs cursor-pointer"
                  title="Send Message"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
