import { ShowData, ShowProps } from '../interfaces/ShowProps'
import { Show } from '../model/Show'

const baseShowProps: ShowProps = {
  data: {
    id: 1,
    showImg: '/images/velapuerca.jpg',
    showName: 'Chanchadas',
    bandName: 'La Vela Puerca',
    facilityName: 'Buenos Aires',
  } as ShowData,
  rating: 4,
  totalComments: 150,
  dates: [new Date('2024-04-11T23:23:34.03791001'), new Date('2024-04-12T23:23:34.038422832')],
  userImageNames: ['/images/pablito.jpeg', '/images/juan.jpeg', '/images/denise.jpeg'],
  price: 23000,
}

export const showBase: Show = new Show(baseShowProps)
export const showUnPaid = new Show({
  ...baseShowProps,
  price: undefined,
  prices: [23000, 29000],
})

export const showPassTheFriendLimits: Show = new Show({
  ...baseShowProps,
  userImageNames: [...baseShowProps.userImageNames!, 'dsadsa'],
})
