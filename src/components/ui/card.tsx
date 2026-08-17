import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const cardVariants = tv({
  base: 'rounded-[30px] transition-all duration-300 relative overflow-hidden',
  variants: {
    variant: {
      default: 'bg-card text-card-foreground shadow-sm border border-border/50',
      glass:
        'backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border border-white/40 dark:border-white/10 shadow-lg',
      glow:
        'bg-card text-card-foreground border border-primary/30 shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]',
      retro:
        'bg-white text-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      colored: 'text-zinc-900 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between p-4 pb-2', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-bold text-base tracking-tight leading-none', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm opacity-70', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between p-4 pt-3 border-t border-white/60 dark:border-white/10', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
