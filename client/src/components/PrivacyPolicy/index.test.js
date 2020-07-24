import React from 'react'
import { screen, render } from '@testing-library/react'

import PrivacyPolicy from '.'

describe('PrivacyPolicy', () => {
  it('renders the correct text', () => {
    window.scrollTo = jest.fn()
    render(<PrivacyPolicy />)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(screen).toMatchSnapshot()
  })
})
