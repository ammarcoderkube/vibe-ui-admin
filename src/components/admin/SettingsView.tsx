import React, { useState } from 'react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { User, Sparkles, Check } from 'lucide-react'
import { ThemePreset } from '../../types/dashboard'

interface SettingsViewProps {
  currentPreset?: ThemePreset
  onSelectPreset?: (p: ThemePreset) => void
}

export const SettingsView: React.FC<SettingsViewProps> = () => {
  const [name, setName] = useState('Aybüke C.')
  const [role, setRole] = useState('Lead Product Designer')
  const [email, setEmail] = useState('aybuke@portfolio.design')
  const [savedMessage, setSavedMessage] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2500)
  }

  return (
    <div className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-y-auto shadow-sm transition-colors duration-200 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--main-color)]">Settings & Preferences</h2>
        <p className="text-xs text-[var(--secondary-color)] font-medium mt-1">
          Customize your profile, notifications, and UI appearance presets.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {/* Profile Card */}
        <div className="p-6 rounded-[28px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-[var(--main-color)]">
            <User className="w-4 h-4 text-primary" />
            <span>Profile Information</span>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <Avatar
              size="lg"
              src="https://assets.codepen.io/3306515/IMG_2025.jpg"
              alt={name}
              className="ring-2 ring-primary"
            />
            <div>
              <Button type="button" variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-[11px] text-[var(--secondary-color)] mt-1">
                JPG, PNG or GIF up to 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--main-color)]">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--main-color)]">Role / Title</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--main-color)]">Email Address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        {/* Info Note on Header Preset */}
        <div className="p-6 rounded-[28px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-2">
          <div className="flex items-center space-x-2 text-sm font-bold text-[var(--main-color)]">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Theme Presets Quick Control</span>
          </div>
          <p className="text-xs text-[var(--secondary-color)] leading-relaxed">
            You can switch between all 4 distinctive Vibe UI presets (<strong>Default Minimal</strong>, <strong>Glassmorphic Arctic Sky</strong>, <strong>Cyber Neon Glow</strong>, and <strong>Warm Neobrutal Retro</strong>) in real time directly from the top header bar.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex items-center space-x-4">
          <Button type="submit" variant="glow" className="px-6">
            Save Changes
          </Button>
          {savedMessage && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences saved!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
