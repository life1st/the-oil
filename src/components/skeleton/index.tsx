import { FC } from 'react'
import type { SkeletonProps } from './types'
import './style.scss'

const Skeleton: FC<SkeletonProps> = ({
  loading = true,
  active = true,
  rows = 3,
  avatar = false,
  className = '',
  children
}) => {
  if (!loading) return <>{children}</>

  return (
    <div className={`skeleton-wrapper ${active ? 'active' : ''} ${className}`}>
      {avatar && (
        <div className="skeleton-avatar">
          <div className="skeleton-animation" />
        </div>
      )}
      
      <div className="skeleton-content">
        {Array(rows).fill(null).map((_, index) => (
          <div 
            key={index}
            className="skeleton-row"
            style={{
              width: index === rows - 1 ? '60%' : '100%'
            }}
          >
            <div className="skeleton-animation" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skeleton 