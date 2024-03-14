import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import CardShow from './CardShow'
import { showBase } from 'src/data/mocks/showMocks'

describe('CardShow Component', () => {
  beforeEach(() => {
    render(<CardShow show={showBase} />)
  })
  test('When you have more firends than the limit, the card, show you the rest of the firends without profile img', async () => {
    //ACT
    screen.getByTestId('more-friends')

    //ASSERT
    expect
  })
})
