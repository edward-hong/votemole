import React from 'react'

import { render, screen, fireEvent } from '../../test-utils/renderWithRedux'
import MyPolls from '.'

describe('MyPolls', () => {
  it('renders page when not logged in', () => {
    render(<MyPolls />, {
      initialState: { auth: false, poll: null, polls: { count: 6, polls: [] } },
    })

    expect(screen).toMatchSnapshot()
  })

  it('when user is logged in, clicking next page renders next 5 polls', () => {
    render(<MyPolls />, {
      initialState: { auth: {}, poll: null, polls: { count: 6, polls: [] } },
    })

    fireEvent.click(screen.getByText('›'))

    expect(screen).toMatchSnapshot()
  })
})
