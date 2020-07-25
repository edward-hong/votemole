import React from 'react'
import { render, screen } from '@testing-library/react'

import FormField from '.'

describe('FormField', () => {
  it('renders an untouched form', () => {
    render(
      <FormField
        input={{ name: 'test' }}
        label="test"
        type="text"
        placeholder="test"
        meta={{ touched: false, error: '' }}
      />,
    )

    expect(screen).toMatchSnapshot()
  })

  it('shows error message', () => {
    render(
      <FormField
        input={{ name: 'test' }}
        label="test"
        type="text"
        placeholder="test"
        meta={{ touched: true, error: 'error' }}
      />,
    )

    expect(screen).toMatchSnapshot()
  })

  it('form is valid when touched with no error', () => {
    render(
      <FormField
        input={{ name: 'test' }}
        label="test"
        type="text"
        placeholder="test"
        meta={{ touched: true, error: '' }}
      />,
    )

    expect(screen).toMatchSnapshot()
  })
})
