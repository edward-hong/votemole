import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink, NavItem } from 'reactstrap'
import styled from 'styled-components'
import { isNil } from 'ramda'

import { AUTH_LOGOUT_PATH, POLLS_USER_PATH } from '../../../constants'

const NavLinkItem = styled(NavItem)`
  text-align: center;
`

// Render nothing if user info hasn't been fetched from backend
// Then conditionally render NavItems depending on whether user is logged in
const NavItems = ({ toggleLogin, toggleAddPoll }) => {
  const isLoggedIn = useSelector(({ auth }) => auth, shallowEqual)

  return isNil(isLoggedIn) ? null : isLoggedIn ? (
    <>
      <NavLink to={POLLS_USER_PATH} tag={Link}>
        <NavLinkItem>My Polls</NavLinkItem>
      </NavLink>
      <NavLink href="#" onClick={toggleAddPoll}>
        <NavLinkItem>Add Poll</NavLinkItem>
      </NavLink>
      <NavLink href={AUTH_LOGOUT_PATH}>
        <NavLinkItem>Logout</NavLinkItem>
      </NavLink>
    </>
  ) : (
    <NavLink href="#" onClick={toggleLogin}>
      <NavLinkItem>Login</NavLinkItem>
    </NavLink>
  )
}

export default NavItems
