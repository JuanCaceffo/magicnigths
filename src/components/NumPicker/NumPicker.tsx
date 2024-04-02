import { useEffect, useRef } from 'react'
import './NumPicker.scss'

interface NumPickerArgs {
  min?: number
  max?: number
  step?: number
  value: number
  handler: (newValue: number) => void
}

export const NumPicker = ({ ...args }: NumPickerArgs) => {
  const { min = -Infinity, max = Infinity, step = 1, value = 0, handler } = args
  const inputRef = useRef<HTMLInputElement>(null)

  const updateWidth = () => {
    if (inputRef.current && !isNaN(+inputRef.current.value)) {
      const digits = inputRef.current.value.length
      inputRef.current.style.width = `${digits + 1}em`
    }
  }

  const decrease = () => {
    value > min && handler(value - step), updateWidth()
  }

  const increase = () => {
    value < max && handler(value + step), updateWidth
  }

  useEffect(() => {
    updateWidth()
  }, [value])

  return (
    <div className="numeric-picker shadow text text--strong">
      <a className="numeric-picker__button text--clear" onClick={decrease}>
        -
      </a>
      <input
        ref={inputRef}
        type="text"
        value={value}
        className="numeric-picker__number"
        pattern="[0-9]+"
        onChange={(e) => {
          const newCount = !isNaN(+e.target.value) ? +e.target.value : value
          handler(newCount)
          updateWidth()
        }}
      />
      <a className="numeric-picker__button text--clear" onClick={increase}>
        +
      </a>
    </div>
  )
}
