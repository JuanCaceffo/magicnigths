import { Box, Button } from "@mui/material"
import "./ShowDetails.scss"
import { DateBox } from "./DateBox"
import { SeatBox } from "./SeatBox"
import { Key } from "react"

const mockShow = {
  name: 'Los Pepes - Pearljam',
  rating: 4.5,
  opinions: 120,
  facility: 'Estadio XYZ',
  geolocation: 'Ciudad ABC',
  dates: [
    { date: '2024-03-25', time: '19:00' },
    { date: '2024-03-26', time: '20:00' },
    { date: '2024-03-27', time: '18:30' }
  ],
  seats: ['Sector A', 'Sector B', 'Sector C']
}

export const ShowDetails = ({ show = mockShow }) => {

  return (
    <Box className="show-details">
      <Box className="show-details__header">
        <Box className="show-details__name title">
          Los Pepes - Pearljam
        </Box>
        <Box className="show-details__info">
          <text className="show-details__info-item subtitle">{show.rating}<text className="subtitle2">{show.opinions}</text></text>
          <text className="show-details__info-item subtitle">{show.facility}</text>
          <text className="show-details__info-item subtitle">{show.geolocation}</text>
        </Box>
      </Box>
      <Box className="show-details__body">
        <Box className="show-details__img">
          <img src="/src/assets/images/pearljam.jpeg" />
        </Box>
        <Box className="show-details__timetable">
          <Box className="show-details__dates">
            {show.dates.map((date, index) => (
              <DateBox key={index} date={date.date} time={date.time} />
            ))}
          </Box>
          <Box className="show-details__seats">
            {show.seats.map((seat: string, index: Key | null | undefined) => (
              <SeatBox key={index} location={seat} />
            ))}
          </Box>
          <Box className="show-details__bottom">
            <Button className="show-details__button"> Agregar al Carrito </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


