import { FC } from 'react'
import cls from 'classnames'
import './style.scss'

interface PlateDisplayProps {
  plate: string
  size?: 'small' | 'medium' | 'large'
}

const PlateDisplay: FC<PlateDisplayProps> = ({
  plate,
  size = 'medium'
}) => {
  // 格式化车牌号并判断类型
  const formatPlate = (plate: string) => {
    if (!plate) return { formatted: '', isNewEnergy: false }
    const plateWithoutSpace = plate.replace(/\s/g, '')
    const isNewEnergy = plateWithoutSpace.length === 8 // 新能源车牌总长度为8位（2位省份+1位字母+5位数字）
    
    if (plateWithoutSpace.length > 2) {
      return {
        formatted: plateWithoutSpace.slice(0, 2) + '-' + plateWithoutSpace.slice(2),
        isNewEnergy
      }
    }
    
    return {
      formatted: plateWithoutSpace,
      isNewEnergy: false
    }
  }

  const { formatted, isNewEnergy } = formatPlate(plate)

  return (
    <div className={cls('plate-display', {
      'plate-display--new-energy': isNewEnergy,
      'plate-display--small': size === 'small',
      'plate-display--large': size === 'large'
    })}>
      <div className="plate-display__content">
        {formatted.split('').map((char, index) => (
          <div 
            key={index}
            className={cls('plate-display__char', {
              'plate-display__char--space': char === '-',
              'electric': isNewEnergy,
            })}
          >
            {char === '-' && isNewEnergy ? '' : char}
          </div>
        ))}
        {!isNewEnergy && <div className={cls('plate-display__char_1')} />}
      </div>
    </div>
  )
}

export default PlateDisplay 