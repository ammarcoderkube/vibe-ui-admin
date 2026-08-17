import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const inputVariants = tv({
  base: 'flex w-full rounded-2xl bg-white dark:bg-slate-800 px-4 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  variants: {
    variant: {
      default: 'border border-border/80 shadow-xs focus-visible:border-primary',
      glass:
        'backdrop-blur-md bg-white/70 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-sm focus:bg-white/90 dark:focus:bg-slate-800/90',
      pill: 'rounded-full border-none shadow-[0_2px_6px_0_rgba(136,148,171,0.2),0_24px_20px_-24px_rgba(71,82,107,0.1)] dark:shadow-none dark:bg-slate-800 focus-visible:ring-primary',
      retro:
        'border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]',
    },
    inputSize: {
      default: 'h-10',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-5 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputSize: 'default',
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, icon, iconPosition = 'right', ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative flex w-full items-center">
          {iconPosition === 'left' && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize }),
              iconPosition === 'left' ? 'pl-10' : 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {iconPosition === 'right' && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
