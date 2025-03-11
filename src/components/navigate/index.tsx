import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutline } from 'antd-mobile-icons'
import './style.scss'

interface NavigateProps {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

const Navigate: FC<NavigateProps> = ({ 
  title, 
  onBack,
  right
}) => {
  const navigate = useNavigate()
  
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="navigate-header">
      <button className="back-button" onClick={handleBack}>
        <LeftOutline />
      </button>
      <h1>{title}</h1>
      {right && <div className="right-content">{right}</div>}
    </div>
  )
}

export default Navigate 