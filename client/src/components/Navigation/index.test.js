import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import {
  screen,
  render,
  fireEvent,
} from '../../test-utils/renderWithReduxAndAlert'

import Navigation from '.'

describe('Navigation', () => {
  it('toggles navigation when hamburger button is clicked', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Navigation />
      </Router>,
    )

    fireEvent.click(screen.getByRole('button'))

    expect(screen).toMatchSnapshot()
  })
})
