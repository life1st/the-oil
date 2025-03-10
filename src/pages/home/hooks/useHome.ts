import { useState, useCallback } from 'react'
import type { HomeState } from '../types'

export const useHome = () => {
  const [state, setState] = useState<HomeState>({})

  const someAction = useCallback(() => {
    // 处理业务逻辑
  }, [])

  return {
    state,
    someAction
  }
} 