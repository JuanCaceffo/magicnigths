import { RenderResult, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, test } from 'vitest'
import { CardShow } from './CardShow'
import { showBase, showUnPaid } from 'data/mocks/showMocks'

describe('CardShow Component', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<CardShow show={showBase} />)
  })
  // test("When a card show doesn't pass more than 3 friends, it should show the word amigos", () => {
  //   const moreFriends = renderResult.getByTestId('more-friends') as HTMLParagraphElement
  //   expect(moreFriends.textContent).toBe('amigos')
  // })

  // test('When you have more friends than the limit, the card, show you the rest of the friends without profile img', () => {
  //   //ARRANGE
  //   renderResult.rerender(<CardShow show={showPassTheFriendLimits} />)

  //   //ASSERT
  //   expect(renderResult.queryByTestId('more-friends')).toBeTruthy()
  // })

  // test('When the cardShow was paid, the price paid is displayed', () => {
  //   const price = renderResult.getByTestId('show-price') as HTMLParagraphElement
  //   expect(price.textContent).contains('Valor: $ 23000')
  // })

  test('When cardShow is not paid, it shows the price to be paid.', () => {
    renderResult.rerender(<CardShow show={showUnPaid} />)

    expect(screen.getByTestId('show-price')).toHaveTextContent('Desde')
  })

  // test('when the amount of the card is passed, is displayed in the right top of the card', () => {
  //   renderResult.rerender(<CardShow show={showBase} />)

  //   expect(renderResult.queryByTestId('show-amount')).toBeTruthy()
  // })

  // test('when the amount of the card is not passed, dont displayed the amount', () => {
  //   expect(renderResult.queryByTestId('show-amount')).toBeFalsy()
  // })

  // test('when passed a button promp, a buton is displayed in the left bottom to the card', () => {
  //   //ARRANGE
  //   renderResult.rerender(<CardShow show={showBase} button={{ content: 'lalala', onClick: () => {} }} />)

  //   //ACT

  //   const card = screen.getByTestId('card-show') as HTMLDivElement // Ajusta el selector según tu implementación
  //   fireEvent.mouseEnter(card)

  //   expect(renderResult.queryByTestId('show-button')).toBeTruthy()
  // })
})
