import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import Landing from './pages/Landing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { fetchUser } from './state/actions'
import { PRIMARY_COLOR } from './constants'

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${PRIMARY_COLOR};
    background-color: #fff;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  }
`

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  return (
    <Wrapper>
      <BrowserRouter>
        <>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/privacy_policy" component={PrivacyPolicy} />
        </>
      </BrowserRouter>
      <GlobalStyle />
    </Wrapper>
  )
}

export default App
