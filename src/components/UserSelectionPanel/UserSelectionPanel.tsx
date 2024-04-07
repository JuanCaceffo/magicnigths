import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface SelectionPanelProps {
  content: SelectionContent
  onChange: (newValue: SelectionContent) => void
}

export const UserSelectionPanel: React.FC<SelectionPanelProps> = ({ content, onChange }) => {
  
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: SelectionContent) => {
    onChange(newValue)
  }

  return (
    <ToggleButtonGroup
      value={content}
      exclusive
      onChange={handleChange}
      className="selection_panel"
    >
      <ToggleButton
        value={SelectionContent.PURCHASED_TICKET}
        className="text--md selection_button"
        disableRipple
      >
        Entradas compradas
      </ToggleButton>
      <ToggleButton
        value={SelectionContent.FRIENDS}
        className="text--md selection_button"
        disableRipple
      >
        Amigos
      </ToggleButton>
      <ToggleButton
        value={SelectionContent.COMMENTS}
        className="text--md selection_button"
        disableRipple
      >
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
  