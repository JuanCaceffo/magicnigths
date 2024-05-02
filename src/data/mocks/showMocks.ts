import { ShowData, ShowProps, ShowStats } from '../interfaces/ShowProps'
import { Show } from '../model/Show'
import { ShowDate } from '../model/ShowDate'

const baseShowProps: ShowProps = {
  data: {
    id: 1,
    showImg: '/images/velapuerca.jpg',
    showName: 'Chanchadas',
    bandName: 'La Vela Puerca',
    facilityName: 'Buenos Aires',
  } as ShowData,
  showStats: {
    rating: 4,
    totalComments: 150,
    userImageNames: ['/images/pablito.jpeg', '/images/juan.jpeg', '/images/denise.jpeg'],
  } as ShowStats,
  dates: [
    new ShowDate({ id: 1, date: new Date('2024-04-11T23:23:34.03791001') }),
    new ShowDate({ id: 2, date: new Date('2024-04-12T23:23:34.038422832') }),
  ],
  price: 23000,
  quantity: 10,
}

export const showBase: Show = new Show(baseShowProps)
export const showUnPaid = new Show({
  ...baseShowProps,
  price: undefined,
  prices: [23000, 29000],
})

export const showPassTheFriendLimits: Show = new Show({
  ...baseShowProps,
  showStats: {
    ...baseShowProps.showStats,
    userImageNames: [...baseShowProps.showStats!!.userImageNames!!, 'dsadsa'],
  },
})
