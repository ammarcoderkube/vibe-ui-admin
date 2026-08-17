import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const avatarVariants = tv({
  base: 'relative flex shrink-0 overflow-hidden rounded-full transition-transform duration-200 select-none',
  variants: {
    size: {
      xs: 'h-5 w-5 text-[10px]',
      sm: 'h-7 w-7 text-xs',
      default: 'h-9 w-9 text-sm',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    },
    variant: {
      default: 'ring-1 ring-border',
      glow: 'ring-2 ring-primary shadow-[0_0_12px_rgba(99,102,241,0.5)]',
      glass: 'ring-2 ring-white/40 shadow-sm backdrop-blur-md',
      retro: 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
})

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, src, alt = 'Avatar', fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, variant, className }))}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 font-semibold text-foreground">
            {fallback || alt?.slice(0, 2).toUpperCase() || '?'}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }
