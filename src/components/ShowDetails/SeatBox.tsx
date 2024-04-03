import React, { useState } from "react"
import { Box } from "@mui/material"
import CounterInput from "./CounterInput"

export const SeatBox = ({ location }) => {
  const [selectedSeats, setSelectedSeats] = useState(0)

  return (
    <Box className="seat-box">
      <Box className="seat-box__seatType">
        {location}
      </Box>
      <Box className="seat-box__price">
        $ {location}
      </Box>
      <Box>
        <CounterInput />
      </Box>
    </Box>
  )
}
