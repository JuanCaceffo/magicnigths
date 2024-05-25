import { ShowProps } from 'models/interfaces/ShowProps'
import { Show } from 'models/Show'

const baseShowProps: ShowProps = {
  id: 1,
  showImg: 'lavelapuerca.jpg',
  showName: 'Cachengued',
  bandName: 'La Vela Puerca',
  facilityName: 'Gran Rex',
  dates: [
    {
      id: 1,
      date: new Date('2024-05-24T15:38:41.458Z'),
    },
  ],
  prices: [18067.5, 23000, 27067.5],
  rating: 3.0,
  totalComments: 2,
  friendsImgs: [],
  geolocation: "Latitude: -34° -36' -12'' S, Longitude: -58° -22' -43'' W",
  comments: [
    {
      id: 2,
      userId: 0,
      showId: 1,
      imgSrc: 'sol.jpeg',
      name: 'Sol',
      text: 'Que divertido estuvo, la pase re bien con mis amigos.',
      rating: 4.5,
      date: new Date('2024-05-25T15:38:41.459695'),
    },
    {
      id: 3,
      userId: 0,
      showId: 1,
      imgSrc: 'anita.jpeg',
      name: 'Ana',
      text: 'Pésimo. El sonido anduvo mal todo el show',
      rating: 1.5,
      date: new Date('2024-05-25T15:38:41.459695'),
    },
  ],
  isSoldOut: false,
}

export const showBase: Show = new Show(baseShowProps)

export const showUnPaid = new Show({
  ...baseShowProps,
  price: undefined,
  prices: [23000, 29000],
})

export const showPassTheFriendLimits: Show = new Show({
  ...baseShowProps,
  friendsImgs: [...baseShowProps.friendsImgs!!, 'dsadsa'],
})
