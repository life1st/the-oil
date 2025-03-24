import { FC, type ReactNode, type MouseEvent } from 'react'
import { AddOutline } from 'antd-mobile-icons'
import './style.scss'

export type FloatButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
interface FloatButtonProps {
  icon?: ReactNode
  children?: ReactNode
  className?: string
  position?: FloatButtonPosition
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  btnName?: string
}

const FloatButton: FC<FloatButtonProps> = ({
  icon = <AddOutline />,
  onClick,
  className = '',
  position = 'bottom-right',
  children,
  btnName = 'add record',
}) => {
  return (
    <button
      className={`float-button ${position} ${className}`}
      onClick={onClick}
      aria-label={`${btnName}`}
    >
      {icon && <span className="float-button-icon">{icon}</span>}
      {children && <span className="float-button-content">{children}</span>}
    </button>
  )
}

export default FloatButton 