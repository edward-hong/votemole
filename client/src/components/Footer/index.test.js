import React from 'react'
import { screen, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Footer from '.'

describe('Footer', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    )

    expect(screen).toMatchSnapshot()
  })
})
