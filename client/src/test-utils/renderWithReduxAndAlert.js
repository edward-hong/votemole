import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider as StateProvider } from 'react-redux'
import { Provider as AlertProvider } from 'react-alert'

import AlertTemplate from '../components/AlertTemplate'
import reducerInitialState from '../state/initialState'
import reducer from '../state/reducers'

const render = (
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <StateProvider store={store}>
      <AlertProvider template={AlertTemplate}>{children}</AlertProvider>
    </StateProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }
