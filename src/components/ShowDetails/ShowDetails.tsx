import { Box, Button } from '@mui/material'
import './ShowDetails.scss'
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
        <div className="show-details">
          <div className="show-details__header text">
            <div className="show-details__name">
              <span className="text--stronger">{`${show.bandName} - `}</span>
              <span>{show.showName}</span>
            </div>
            <div className="show-details__info text text--md">
              <div className="show-details__info-item">
                <span className="text--stronger">
                  <i className="fas fa-star fa-rp" />
                  {`${show.rating} Puntos - `}
                </span>
                <span>{`${show.totalComments} Opiniones`}</span>
              </div>
              <span className="show-details__info-item text--stronger">
                <i className="fas fa-compass fa-rp" />
                {show.facilityName}
              </span>
              <span className="show-details__info-item">{show.geolocation}</span>
            </div>
          </div>
          <div className="show-details__body">
            <div className="show-details__img">
              <img src={`/src/assets/images/${show.showImg}`} />
            </div>
            <Box className="show-details__timetable">
              <Box className="show-details__dates">
                {show.dates.map((date, index) => (
                  <></>
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
          </div>
        </div>
      )}
    </>
  )
}
