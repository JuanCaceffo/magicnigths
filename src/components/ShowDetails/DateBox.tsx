import { Box } from "@mui/material"
import "./ShowDetails.scss"

export const DateBox = ({ date }) => {
  return <>
    <Box className="date-box">
      <Box className="date-box__day">{date}</Box>
      <Box className="date-box__time">{date}</Box>
    </Box>
  </>
}