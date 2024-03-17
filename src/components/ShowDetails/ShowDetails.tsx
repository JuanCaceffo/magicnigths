import { Box, Button } from "@mui/material"
import "./ShowDetails.scss"
import { DateBox } from "./DateBox"
import { SeatBox } from "./SeatBox"

export const ShowDetails = () => {
  const dates = ["2024-03-18", "2024-03-19", "2024-03-20", "2024-03-21"]
  const seats = ["Upper Level", "Box", "Field"]

  return <>
    <Box className="show-details">
      <Box className="show-details__header">

      </Box>
      <Box className="show-details__body">
        <Box className="show-details__img">
          <img src="/src/assets/images/pearljam.jpeg" />
        </Box>
        <Box className="show-details__timetable">
          <Box className="show-details__dates">
            {dates.map((date, index) => (
              <DateBox key={index} date={date} />
            ))}
          </Box>
          <Box className="show-details__seats">
            {seats.map((seat, index) => (
              <SeatBox key={index} location={seat} />
            ))}
          </Box>
          <Box>
            <Button> Agregar al Carrito </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  </>
}


