import { Box, Button } from '@mui/material'
import './ShowDetails.scss'
import { DateBox } from './DateBox'
import { useEffect, useState } from 'react'
import { showService } from 'src/services/ShowService'
import { Show } from 'src/data/model/Show'
import { useParams } from 'react-router-dom'

export const ShowDetails = () => {
  const params = useParams()
  const [show, setShow] = useState<Show>()

  useEffect(() => {
    try {
      const fechShow = async () => {
        showService.getShowById(+params['showId']!!).then((value) => {
          setShow(value)
        })
      }
      fechShow()
    } catch (err) {
      console.log(err)
    }
  }, [params])

  return (
    <>
      {show && (
        <Box className="show-details">
          <Box className="show-details__header">
            <Box className="show-details__name title">Los Pepes - Pearljam</Box>
            <Box className="show-details__info">
              <span className="show-details__info-item subtitle">
                {show && show.props.rating}
                <span className="subtitle2">{}</span>
              </span>
              <span className="show-details__info-item subtitle">{}</span>
              <span className="show-details__info-item subtitle">{}</span>
            </Box>
          </Box>
          <Box className="show-details__body">
            <Box className="show-details__img">
              <img src="/src/assets/images/pearljam.jpeg" />
            </Box>
            <Box className="show-details__timetable">
              <Box className="show-details__dates">
                {show.dates.map((date, index) => (
                  <DateBox key={index} date={date} time={date} />
                ))}
              </Box>
              <Box className="show-details__seats">
                {/* {show.props.seats.map((name: string, index: Key | null | undefined) => (
                  // <SeatBox key={index} location={seat} />
                  <QtySelector
                    key={index}
                    handleInputChange={function (): void {
                      throw new Error('Function not implemented.')
                    }}
                    value={undefined}
                    name={name}
                    price={0}
                    maxQuantity={0}
                  ></QtySelector>
                ))} */}
              </Box>
              <Box className="show-details__bottom">
                <Button className="show-details__button"> Agregar al Carrito </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
