import React from 'react'
import { render, screen } from '@testing-library/react'

import AlertTemplate from '.'

describe('AlertTemplate', () => {
  it('renders properly', () => {
    const style = {}
    const options = { type: '' }
    const message = 'hello'
    const close = jest.fn()

    render(
      <AlertTemplate
        style={style}
        options={options}
        message={message}
        close={close}
      />,
    )

    expect(screen).toMatchSnapshot()
  })

  it('options type of "success" produces icon of class check-circle', () => {
    const style = {}
    const options = { type: 'success' }
    const message = 'hello'
    const close = jest.fn()

    render(
      <AlertTemplate
        style={style}
        options={options}
        message={message}
        close={close}
      />,
    )

    expect(screen).toMatchSnapshot()
  })
})
