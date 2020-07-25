import React from 'react'

import { render, screen, fireEvent } from '../../test-utils/renderWithRedux'
import Home from '.'

describe('Home', () => {
  it('clicking next page renders next 5 polls', () => {
    render(<Home />, {
      initialState: { auth: null, poll: null, polls: { count: 6, polls: [] } },
    })

    fireEvent.click(screen.getByText('›'))

    expect(screen).toMatchSnapshot()
  })
})
