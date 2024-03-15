import { Show } from '../model/Show'

//TODO: Solve problem with clone show object

export const showBase: Show = new Show(
  '/mock-imgs/card-show-imgs/velapuerca.jpg',
  'la vela puerca',
  4,
  150,
  'Buenos Aires',
  [new Date('Jul 12 2024'), new Date('Jul 16 2024')],
  ['/mock-imgs/user-imgs/pablito.jpeg', '/mock-imgs/user-imgs/juan.jpeg', '/mock-imgs/user-imgs/denise.jpeg'],
  23000,
)
export const showUnPaid = new Show(
  '/mock-imgs/card-show-imgs/velapuerca.jpg',
  'la vela puerca',
  4,
  150,
  'Buenos Aires',
  [new Date('Jul 12 2024'), new Date('Jul 16 2024')],
  [''],
  undefined,
  [23000, 29000],
)

export const showPassTheFirendLimits: Show = new Show(
  '/mock-imgs/card-show-imgs/velapuerca.jpg',
  'la vela puerca',
  4,
  150,
  'Buenos Aires',
  [new Date('Jul 12 2024'), new Date('Jul 16 2024')],
  ['/mock-imgs/user-imgs/pablito.jpeg', '/mock-imgs/user-imgs/juan.jpeg', '/mock-imgs/user-imgs/denise.jpeg', 'dsadas'],
  23000,
)
