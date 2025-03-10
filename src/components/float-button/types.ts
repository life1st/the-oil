import type { ReactNode, MouseEvent } from 'react'

export type FloatButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface FloatButtonProps {
  icon?: ReactNode
  children?: ReactNode
  className?: string
  position?: FloatButtonPosition
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
} 