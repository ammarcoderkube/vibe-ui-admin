import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const badgeVariants = tv({
  base: 'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border border-border text-foreground',
      glass: 'backdrop-blur-md bg-white/60 dark:bg-black/30 border border-white/40 dark:border-white/10 text-foreground shadow-xs',
      pill: 'bg-white/70 dark:bg-slate-900/60 font-bold shadow-xs',
      glow: 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_10px_rgba(99,102,241,0.3)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
