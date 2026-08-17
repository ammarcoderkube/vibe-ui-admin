import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer select-none',
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg',
      glow:
        'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] border border-primary/40',
      glass:
        'backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-sm',
      retro:
        'bg-amber-300 text-zinc-900 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold',
      outline:
        'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost:
        'hover:bg-accent hover:text-accent-foreground text-foreground',
      icon:
        'rounded-full p-0 bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/10',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-lg px-3 text-xs',
      lg: 'h-12 rounded-2xl px-6 text-base',
      icon: 'h-9 w-9',
      iconSm: 'h-7 w-7',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
