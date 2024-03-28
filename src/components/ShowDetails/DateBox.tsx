import { Box } from "@mui/material"
import "./ShowDetails.scss"

interface DateBoxProps {
  timestamp: string
}

export const DateBox = ({ ...props }) => {
  return <>
    <Box className="date-box">
      <Box className="date-box__day">{ }</Box>
      <Box className="date-box__time">{ }</Box>
    </Box>
  </>
}