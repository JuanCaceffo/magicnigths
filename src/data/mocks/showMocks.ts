import { ShowProps } from '../interfaces/ShowProps'
import { Show } from '../model/Show'

const baseShowProps: ShowProps = {
  showImg: '/mock-imgs/card-show-imgs/velapuerca.jpg',
  name: 'la vela puerca',
  valoration: 4,
  valorationSize: 150,
  ubication: 'Buenos Aires',
  dates: [new Date(2024, 7, 12), new Date(2024, 7, 16)],
  userImgs: ['/mock-imgs/user-imgs/pablito.jpeg', '/mock-imgs/user-imgs/juan.jpeg', '/mock-imgs/user-imgs/denise.jpeg'],
  price: 23000,
}

export const showBase: Show = new Show(baseShowProps)
export const showUnPaid = new Show({
  ...baseShowProps,
  price: undefined,
  pricePaid: [23000, 29000],
})
export const showPassTheFirendLimits: Show = new Show({
  ...baseShowProps,
  userImgs: [...baseShowProps.userImgs, 'dsadsa'],
})
