import { AxiosError } from 'axios'

export const ErrorHandler = (error: AxiosError, setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>) => {
  const safeErrorCode = error.response ? +error.response.status : 0
  const data = error.response?.data as { message: string }

  safeErrorCode >= 500
    ? setErrorMsg('Hubo un error al realizar la operación. Consulte al administrador del sistema.')
    : safeErrorCode === 404
      ? setErrorMsg(`Recurso no encontrado: ${data.message}`)
      : safeErrorCode >= 400
        ? setErrorMsg('Error en la solicitud. Verifique los datos e intente nuevamente.')
        : safeErrorCode === 0
          ? setErrorMsg('El servidor se encuentra sin conexión.')
          : setErrorMsg('Error desconocido')

  setTimeout(() => {
    setErrorMsg(null)
  }, 5000)
}
