import { Show } from '../model/Show'

export const showBase: Show = new Show(
  '/mock-imgs/card-show-imgs/velapuerca.jpg',
  'la vela puerca',
  4,
  150,
  'Buenos Aires',
  [new Date('14/06/2024'), new Date('18/06/2024')],
  ['/mock-imgs/user-imgs/pablito.jpeg', '/mock-imgs/user-imgs/juan.jpeg', '/mock-imgs/user-imgs/denise.jpeg'],
  23000,
)
