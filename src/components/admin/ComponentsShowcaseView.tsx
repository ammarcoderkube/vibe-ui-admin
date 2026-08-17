import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Avatar } from '../ui/avatar'
import { Input } from '../ui/input'
import { Sparkles, Flame, Shield, Search, Zap, Layers } from 'lucide-react'

export const ComponentsShowcaseView: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'default' | 'glass' | 'retro' | 'glow'>('glow')
  const [sliderVal, setSliderVal] = useState(72)
  const [switchOn, setSwitchOn] = useState(true)
  const [otp, setOtp] = useState(['4', '8', '2', '9'])

  return (
    <div className="flex-1 min-w-0 bg-[var(--projects-section)] rounded-[32px] p-6 sm:p-8 flex flex-col h-full overflow-y-auto shadow-sm transition-colors duration-200 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--message-box-border)]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-lg bg-primary/20 text-primary">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-primary">
              Interactive Library
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--main-color)] mt-1">
            Vibe UI Kit Component Playground
          </h2>
          <p className="text-xs text-[var(--secondary-color)] font-medium mt-1">
            51+ components across 4 built-in aesthetic presets: Default, Glass, Glow, and Retro.
          </p>
        </div>

        {/* Live Preset Switcher for buttons */}
        <div className="flex items-center space-x-1.5 bg-[var(--inner-card-bg)] p-1.5 rounded-2xl border border-[var(--message-box-border)]">
          {(['default', 'glass', 'glow', 'retro'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => setActivePreset(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                activePreset === preset
                  ? 'bg-primary text-white shadow-sm scale-105'
                  : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Interactive Component Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Button Presets */}
        <div className="p-6 rounded-[26px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[var(--main-color)] flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Button Variants
            </h4>
            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-md">
              preset: {activePreset}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button variant={activePreset} size="sm">
              Primary Action
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="glass" size="sm">
              Glass Blur
            </Button>
            <Button variant="retro" size="sm">
              Retro Box
            </Button>
          </div>
        </div>

        {/* 2. Status Badges & Pills */}
        <div className="p-6 rounded-[26px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4">
          <h4 className="font-bold text-sm text-[var(--main-color)] flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" /> Badges & Status
          </h4>

          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="glow">Neon Glow</Badge>
            <Badge variant="glass">Glass Frost</Badge>
            <Badge variant="pill">2 Days Left</Badge>
            <Badge variant="default">Completed</Badge>
            <Badge variant="destructive">Urgent</Badge>
          </div>
        </div>

        {/* 3. Avatars & Glow Rings */}
        <div className="p-6 rounded-[26px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4">
          <h4 className="font-bold text-sm text-[var(--main-color)] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" /> Avatar Scales
          </h4>

          <div className="flex items-center space-x-3 pt-1">
            <Avatar
              size="sm"
              src="https://assets.codepen.io/3306515/IMG_2025.jpg"
              alt="User"
              variant="glow"
            />
            <Avatar
              size="default"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="User"
              variant="glass"
            />
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="User"
              variant="glow"
            />
            <Avatar
              size="lg"
              src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="User"
              variant="glow"
            />
          </div>
        </div>

        {/* 4. Progress & Slider */}
        <div className="p-6 rounded-[26px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-[var(--main-color)]">
              Progress Range
            </h4>
            <span className="text-xs font-bold text-primary">{sliderVal}%</span>
          </div>

          <Progress value={sliderVal} indicatorColor="var(--primary)" className="h-2" />

          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer mt-2"
          />
        </div>

        {/* 5. Custom Inputs & OTP */}
        <div className="p-6 rounded-[26px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4">
          <h4 className="font-bold text-sm text-[var(--main-color)]">
            Input OTP & Search
          </h4>

          <Input
            icon={<Search className="w-4 h-4" />}
            placeholder="Pill input with icon..."
            variant="pill"
          />

          <div className="flex items-center space-x-2 pt-1">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const copy = [...otp]
                  copy[idx] = e.target.value
                  setOtp(copy)
                }}
                className="w-10 h-10 text-center font-bold text-base rounded-xl bg-[var(--modal-bg)] border border-[var(--modal-border)] text-[var(--main-color)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            ))}
          </div>
        </div>

        {/* 6. Toggle Switcher */}
        <div className="p-6 rounded-[26px] bg-[var(--inner-card-bg)] border border-[var(--message-box-border)] space-y-4 flex flex-col justify-between">
          <h4 className="font-bold text-sm text-[var(--main-color)]">
            Animated Toggle Switch
          </h4>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--modal-bg)] border border-[var(--message-box-border)]">
            <span className="text-xs font-bold text-[var(--main-color)]">
              Auto-Save State
            </span>
            <button
              onClick={() => setSwitchOn(!switchOn)}
              className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                switchOn ? 'bg-primary justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
              }`}
            >
              <span className="w-4.5 h-4.5 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          <div className="text-[11px] text-[var(--secondary-color)] font-medium">
            Supports smooth transitions and keyboard accessibility.
          </div>
        </div>
      </div>

      {/* Preset Card Comparison Gallery */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[var(--main-color)] flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" /> Visual Presets In Action
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-[24px] bg-card border border-border text-foreground shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Preset 1
            </span>
            <h5 className="text-base font-bold mt-1">Default Minimal</h5>
            <p className="text-xs text-muted-foreground mt-1">Clean, high-contrast typography.</p>
          </div>

          <div className="p-5 rounded-[24px] backdrop-blur-xl bg-sky-50/70 dark:bg-slate-900/60 border border-sky-200/60 dark:border-sky-500/20 shadow-lg text-sky-950 dark:text-sky-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Preset 2
            </span>
            <h5 className="text-base font-bold mt-1">Glassmorphic</h5>
            <p className="text-xs opacity-80 mt-1">Frosted cyan glass backdrop saturation.</p>
          </div>

          <div className="p-5 rounded-[24px] bg-purple-50/50 dark:bg-purple-950/30 border border-purple-400/40 shadow-[0_0_25px_rgba(168,85,247,0.2)] text-purple-950 dark:text-purple-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Preset 3
            </span>
            <h5 className="text-base font-bold mt-1">Neon Glow Aura</h5>
            <p className="text-xs opacity-80 mt-1">Deep violet with vivid neon aura glow.</p>
          </div>

          <div className="p-5 rounded-[24px] bg-yellow-100 text-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">
              Preset 4
            </span>
            <h5 className="text-base font-bold mt-1">Retro Neobrutalism</h5>
            <p className="text-xs text-zinc-800 mt-1">Bold black borders with hard offset shadows.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
