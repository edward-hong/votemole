import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ajax } from 'rxjs/ajax'

import AddPollModal from '.'
import {
  render,
  screen,
  fireEvent,
} from '../../../test-utils/renderWithReduxAndAlert'

jest.mock('rxjs/ajax')

describe('AddPollModal', () => {
  it('form submits properly', () => {
    ajax.mockReturnValue({ subscribe: () => {} })

    const props = {
      isOpen: true,
      handleSubmit: (fn) => fn({ pollQuestion: 'test', options: [] }),
    }

    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <AddPollModal {...props} />
      </Router>,
      {
        initialState: {
          auth: { id: '123' },
        },
      },
    )

    fireEvent.click(screen.getByText('Add Option'))
    fireEvent.click(screen.getByText('Add Option'))

    fireEvent.input(screen.getByPlaceholderText('Enter your poll question'), {
      target: { value: 'test' },
    })
    fireEvent.input(screen.getByPlaceholderText('Option 1'), {
      target: { value: 'a' },
    })
    fireEvent.input(screen.getByPlaceholderText('Option 2'), {
      target: { value: 'b' },
    })

    fireEvent.click(screen.getByText('Submit'))

    expect(ajax).toHaveBeenCalled()
    expect(screen).toMatchSnapshot()
  })

  it('shows error when options are same value', () => {
    const props = {
      isOpen: true,
    }

    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <AddPollModal {...props} />
      </Router>,
    )

    fireEvent.click(screen.getByText('Add Option'))
    fireEvent.click(screen.getByText('Add Option'))

    fireEvent.input(screen.getByPlaceholderText('Enter your poll question'), {
      target: { value: 'test' },
    })
    fireEvent.input(screen.getByPlaceholderText('Option 1'), {
      target: { value: 'a' },
    })
    fireEvent.input(screen.getByPlaceholderText('Option 2'), {
      target: { value: 'a' },
    })

    expect(screen).toMatchSnapshot()
  })

  it('shows error when options are added over 20 times', () => {
    const props = {
      isOpen: true,
    }

    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <AddPollModal {...props} />
      </Router>,
    )

    fireEvent.input(screen.getByPlaceholderText('Enter your poll question'), {
      target: { value: 'test' },
    })

    for (let i = 0; i < 20; i++) {
      fireEvent.click(screen.getByText('Add Option'))
      fireEvent.input(screen.getByPlaceholderText(`Option ${i + 1}`), {
        target: { value: i.toString() },
      })
    }

    fireEvent.click(screen.getByText('Add Option'))

    expect(screen).toMatchSnapshot()
  })

  it('calls `reset` and `toggle` on cancel', () => {
    const reset = jest.fn()
    const toggle = jest.fn()

    const props = {
      isOpen: true,
      reset,
      toggle,
    }

    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <AddPollModal {...props} />
      </Router>,
    )

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(screen).toMatchSnapshot()
  })
})
