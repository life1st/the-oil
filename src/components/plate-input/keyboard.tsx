import { FC } from 'react'
import './style.scss'

interface KeyboardProps {
  onKeyPress: (key: string) => void
  onDelete: () => void
  onDone: () => void
  onClear: () => void
  currentLength: number
}

const Keyboard: FC<KeyboardProps> = ({ 
  onKeyPress, 
  onDelete, 
  onDone,
  onClear,
  currentLength 
}) => {
  const provinces = [
    '京', '津', '冀', '晋', '蒙', '辽', '吉', '黑',
    '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
    '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵',
    '云', '藏', '陕', '甘', '青', '宁', '新'
  ]

  const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
    'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  // 根据当前输入长度决定显示哪个键盘
  const showProvinces = currentLength === 0
  const showLetters = currentLength === 1
  const showNumbers = currentLength > 1

  return (
    <div className="plate-keyboard">
      {showProvinces && (
        <div className="plate-keyboard-row">
          {provinces.map(province => (
            <button
              key={province}
              className="plate-keyboard-key"
              onClick={() => { onKeyPress(province); }}
            >
              {province}
            </button>
          ))}
        </div>
      )}

      {showLetters && (
        <div className="plate-keyboard-row">
          {letters.map(letter => (
            <button
              key={letter}
              className="plate-keyboard-key"
              onClick={() => { onKeyPress(letter); }}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {showNumbers && (
        <>
          <div className="plate-keyboard-row">
            {letters.map(letter => (
              <button
                key={letter}
                className="plate-keyboard-key"
                onClick={() => { onKeyPress(letter); }}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="plate-keyboard-row">
            {numbers.map(number => (
              <button
                key={number}
                className="plate-keyboard-key"
                onClick={() => { onKeyPress(number); }}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="plate-keyboard-row">
        <button
          className="plate-keyboard-key delete"
          onClick={onClear}
          disabled={currentLength === 0}
        >
          清空
        </button>
        <button
          className="plate-keyboard-key delete"
          onClick={onDelete}
          disabled={currentLength === 0}
        >
          删除
        </button>
        <button
          className="plate-keyboard-key done"
          onClick={onDone}
        >
          完成
        </button>
      </div>
    </div>
  )
}

export default Keyboard 