import { FC } from 'react'
import type { FloatButtonProps } from './types'
import { AddOutline } from 'antd-mobile-icons'
import './style.scss'

const FloatButton: FC<FloatButtonProps> = ({
  icon = <AddOutline />,
  onClick,
  className = '',
  position = 'bottom-right',
  children
}) => {
  return (
    <button 
      className={`float-button ${position} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="float-button-icon">{icon}</span>}
      {children && <span className="float-button-content">{children}</span>}
    </button>
  )
}

export default FloatButton 