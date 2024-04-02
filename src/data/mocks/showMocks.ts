import { ShowProps } from '../interfaces/ShowProps'
import { Show } from '../model/Show'

const baseShowProps: ShowProps = {
  id: 1,
  showImg: '/mock-imgs/card-show-imgs/velapuerca.jpg',
  showName: 'Chanchadas',
  rating: 4,
  totalComments: 150,
  facilityName: 'Buenos Aires',
  dates: [new Date('2024-04-11T23:23:34.03791001'), new Date('2024-04-12T23:23:34.038422832')],
  userImageNames: [
    '/mock-imgs/user-imgs/pablito.jpeg',
    '/mock-imgs/user-imgs/juan.jpeg',
    '/mock-imgs/user-imgs/denise.jpeg',
  ],
  price: 23000,
  bandName: 'La Vela Puerca',
}

export const showBase: Show = new Show(baseShowProps)
export const showUnPaid = new Show({
  ...baseShowProps,
  price: undefined,
  prices: [23000, 29000],
})

export const showPassTheFriendLimits: Show = new Show({
  ...baseShowProps,
  userImageNames: [...baseShowProps.userImageNames!!, 'dsadsa'],
})
