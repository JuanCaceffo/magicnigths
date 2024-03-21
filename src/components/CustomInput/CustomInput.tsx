import { Input } from '@mui/material'

interface InputProps {
  id: string
  className: string
  placeholder?: string
  type?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const CustomInput: React.FC<InputProps> = ({ id, className, placeholder, type, value, setValue }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value) // Actualiza el estado con el valor del input
  }

  return (
    <Input
      id={id}
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleInputChange}
    />
  )
}
