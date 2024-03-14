import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, test } from 'vitest'
import CardShow from './CardShow'
import { showBase, showPassTheFirendLimits } from 'src/data/mocks/showMocks'

describe('CardShow Component', () => {
  beforeEach(() => {
    render(<CardShow show={showBase} />)
  })
  test('When in a cardShow dont pass the limit friends, is just only displayed the usrs profile imgs', () => {
    expect(screen.queryByTestId('more-friends')).toBeNull()
  })

  test('When you have more firends than the limit, the card, show you the rest of the firends without profile img', async () => {
    //ARRANGE
    render(<CardShow show={showPassTheFirendLimits} />)

    //ASSERT
    expect(screen.getByTestId('more-friends')).toBeTruthy()
  })

  test('When the cardShow was paied, the price paid is displayed', () => {
    expect(screen.getByTestId('price')).toHaveTextContent('Precio pagado')
  })

  test('When cardShow is not paid, it shows the price to be paid.')
})
