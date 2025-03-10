import type { ReactNode } from 'react'

export interface SkeletonProps {
  loading?: boolean
  active?: boolean
  rows?: number
  avatar?: boolean
  className?: string
  children?: ReactNode
} 