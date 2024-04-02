import CardShow from "../CardShow/CardShow"
import { useEffect, useState } from "react"
import { userService } from "src/services/UserService"
import { isAxiosError } from "axios"
import { Show } from "src/data/model/Show"
import './PurchasedTicketContent.css'

export const PurchasedTicketContent = (() => {

  const [shows, setShows] = useState<Show[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    const fetchUserShpws = async () => {
      try {
        const userShows= await userService.getPurchasedTickets() //Datos de los shows comprados por el usuario del backend
        setShows(userShows)
      } catch (e) {
        console.log(e)
        // Mensaje de error en caso de que lo haya
        if (isAxiosError(e)) {
          if (e.message) {
            setErrorMessage(e.message)
          } else {
            setErrorMessage(e.response?.data.message)
          }
        } else {
          setErrorMessage(e as string)
        }
      }
    }

    fetchUserShpws()
  }, [])

  const handleAddComment = () => {
    //TODO: Hacer funcion
    console.log("Se apretó el botón")
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <div className='tickets_container'>
          {/* Se muestra la card con el botón o sin el botón segun corresponda */}
          {shows.map((show, index) => (
            <div>
              {show.canBeComment() && <CardShow key={index} show={show} button={{ content: "Calificar artista", whenclick: handleAddComment }} />}
              { !show.canBeComment() && <CardShow key={index} show={show} />}
            </div>
          ))}
        </div>
      )}
    </>
  )
  

})
