import React from 'react'

import { render, screen } from '../../test-utils/renderWithReduxAndAlert'

import App from '.'

describe('App', () => {
  it('renders properly', () => {
    render(<App />)

    expect(screen).toMatchSnapshot()
  })
})
