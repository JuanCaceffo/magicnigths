import { AxiosError } from 'axios'

export const ErrorHandler = (error: AxiosError) => {
  const safeErrorCode = error.response ? +error.response.status : 0
  const data = error.response?.data as { message: string }

  return safeErrorCode >= 500
    ? 'Hubo un error al realizar la operación. Consulte al administrador del sistema.'
    : safeErrorCode >= 400
      ? data
      : 'Error desconocido'
}
