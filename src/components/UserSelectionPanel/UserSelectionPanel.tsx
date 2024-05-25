import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import './UserSelectionPanel.scss'

interface SelectionPanelProps {
  content: SelectionContent
  onChange: (newValue: SelectionContent) => void
}

export const UserSelectionPanel: React.FC<SelectionPanelProps> = ({ content, onChange }) => {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: SelectionContent) => {
    onChange(newValue)
  }

  return (
    <ToggleButtonGroup value={content} exclusive onChange={handleChange} className="selection__panel">
      <ToggleButton value={SelectionContent.PURCHASED_TICKET} className="text text--md selection__button" disableRipple>
        Entradas compradas
      </ToggleButton>
      <ToggleButton value={SelectionContent.FRIENDS} className="text text--md selection__button" disableRipple>
        Amigos
      </ToggleButton>
      <ToggleButton value={SelectionContent.COMMENTS} className="text text--md selection__button" disableRipple>
        Comentario
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

// Enum para los tipos de contenidos a mostrar
export enum SelectionContent {
  PURCHASED_TICKET,
  FRIENDS,
  COMMENTS,
}
