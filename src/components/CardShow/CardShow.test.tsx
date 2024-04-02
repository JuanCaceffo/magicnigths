import { RenderResult, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, test } from 'vitest'
import CardShow from './CardShow'
import { showBase, showPassTheFriendLimits, showUnPaid } from 'src/data/mocks/showMocks'

describe('CardShow Component', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<CardShow show={showBase} />)
  })
  test('When in a cardShow dont pass the limit friends, is just only displayed the usrs profile imgs', () => {
    expect(renderResult.queryByTestId('more-friends')).toBeNull()
  })

  test('When you have more firends than the limit, the card, show you the rest of the firends without profile img', () => {
    //ARRANGE
    renderResult.rerender(<CardShow show={showPassTheFriendLimits} />)

    //ASSERT
    expect(renderResult.queryByTestId('more-friends')).toBeTruthy()
  })

  test('When the cardShow was paied, the price paid is displayed', () => {
    expect(renderResult.getByTestId('show-price')).toHaveTextContent('Precio pagado')
  })

  test('When cardShow is not paid, it shows the price to be paid.', () => {
    renderResult.rerender(<CardShow show={showUnPaid} />)

    expect(screen.getByTestId('show-price')).toHaveTextContent('Desde')
  })

  test('when the amount of the card is passed, is displayed in the right top of the card', () => {
    renderResult.rerender(<CardShow show={showBase} amount={3} />)

    expect(renderResult.queryByTestId('show-amount')).toBeTruthy()
  })
  test('when the amount of the card is not passed, dont displayed the amount', () => {
    expect(renderResult.queryByTestId('show-amount')).toBeFalsy()
  })

  test('when passed a button promp, a buton is displayed in the left bottom to the card', () => {
    renderResult.rerender(<CardShow show={showBase} button={{ content: 'lalala', whenclick: () => {} }} />)

    expect(renderResult.queryByTestId('show-button')).toBeTruthy()
  })
})
