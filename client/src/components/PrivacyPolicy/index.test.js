import React from 'react'
import { screen, render } from '@testing-library/react'

import PrivacyPolicy from '.'

describe('PrivacyPolicy', () => {
  it('renders correctly and scrolls to top of page', () => {
    window.scrollTo = jest.fn()
    render(<PrivacyPolicy />)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(screen).toMatchSnapshot()
  })
})
