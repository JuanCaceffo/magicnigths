import { useEffect } from 'react'

export const useOnInit = (initialCallBack: () => void): void => {
  useEffect(() => {
    initialCallBack()
  }, [])
}
