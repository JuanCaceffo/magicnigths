import { AxiosError, isAxiosError } from 'axios'

export const errorHandler = (error: AxiosError) => {
  const data = error.response?.data as { status: number; message: string }

  if (!isAxiosError(error)) {
    return 'Error desconocido'
  }

  return data
    ? data.status >= 500
      ? 'Hubo un error al realizar la operación. Consulte al administrador del sistema.'
      : data.status >= 400
        ? data.message
        : 'Error desconocido'
    : 'Esta tenienedo problemas con la red'
}
