import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import styled from 'styled-components'

import { PRIMARY_COLOR } from '../constants'

const NavigationBar = styled(Navbar)`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${PRIMARY_COLOR};
  padding: 0.5rem 1rem;
`

const BrandImg = styled.img`
  width: 82.3px;
`

const BrandLink = styled(Link)`
  text-decoration: none;
  font-size: 1.25rem;
  display: flex;
  line-height: 50px;

  &:visited {
    color: ${PRIMARY_COLOR};
  }
`
const Hamburger = styled(NavbarToggler)`
  && {
    color: ${PRIMARY_COLOR};
    width: 56px;
    height: 40px;
    position: relative;
    line-height: 40px;
    border-color: ${PRIMARY_COLOR};

    span {
      background-image: none;
      width: 30px;
      height: 2px;
      background-color: ${({ isOpen }) =>
        isOpen ? 'transparent' : PRIMARY_COLOR};
      position: absolute;
      transform: translate(-50%, -50%);

      &::before {
        top: ${({ isOpen }) => (isOpen ? '0px' : '-8px')};
        transform: ${({ isOpen }) => (isOpen ? 'rotate(135deg)' : 'none')};
      }

      &::after {
        top: ${({ isOpen }) => (isOpen ? '0px' : '8px')};
        transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'none')};
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 2px;
        background-color: ${PRIMARY_COLOR};
        left: -0.0001%;
        transition: all 0.2s ease 0s;
      }
    }
  }
`

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavigationBar light expand="md">
      <NavbarBrand tag={BrandLink} to="/">
        <BrandImg
          src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
          alt="vote mole logo"
        />
        VoteMole
      </NavbarBrand>
      <Hamburger isOpen={isOpen} onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#">Login</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </NavigationBar>
  )
}

export default Header
