import { beforeEach, describe, expect, test } from 'vitest'
import CardDate from './CardDate'
import { RenderResult, render } from '@testing-library/react'

describe('card date tests', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<CardDate date={new Date()} handleClick={() => {}} />)
  })
  test('cuando un card date no es seleccionado tiene las calses por defecto', () => {
    expect(renderResult.getByTestId('cardDate')).toHaveClass('card-date')
  })

  test('cuando un card date es seleccionado se le agrega una clase que indica su seleccion', () => {
    renderResult.rerender(<CardDate date={new Date()} isSelected={true} handleClick={() => {}} />)

    expect(renderResult.getByTestId('cardDate')).toHaveClass('card-date--active')
  })

  test('cuando un card date esta desabilitada se le agrega una clase que lo indique', () => {
    renderResult.rerender(<CardDate date={new Date()} isDisable={true} handleClick={() => {}} />)

    expect(renderResult.getByTestId('cardDate')).toHaveClass('card-date--disabled')
  })
})
