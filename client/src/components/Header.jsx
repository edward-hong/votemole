import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  Button,
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
const Hamburger = styled(({ isOpen, ...rest }) => <NavbarToggler {...rest} />)`
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
const LoginButton = styled(Button)`
  && {
    color: ${({ color }) => color};
    border-color: ${({ color }) => color};

    &:focus {
      box-shadow: ${({ shadow }) => `${shadow} 0px 0px 0px 3px`};
    }

    &:hover {
      background-color: ${({ color }) => color};
      color: white;
    }
  }
`

const NavListItem = styled(NavItem)`
  text-align: center;
`

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const auth = useSelector(({ auth }) => auth)

  const toggle = () => setIsOpen(!isOpen)
  const toggleModal = () => setModal(!modal)

  const openModal = (e) => {
    e.preventDefault()
    toggleModal()
  }

  const renderNavItems = () => {
    switch (auth) {
      case null:
        return
      case false:
        return (
          <NavListItem>
            <NavLink onClick={openModal} href="#">
              Login
            </NavLink>
          </NavListItem>
        )
      default:
        return (
          <>
            <NavListItem>
              <NavLink href="#">My Polls</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink href="#">Add Polls</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink href="/auth/logout">Logout</NavLink>
            </NavListItem>
          </>
        )
    }
  }

  return (
    <>
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
          <Nav className="ml-auto" navbar>
            {renderNavItems()}
          </Nav>
        </Collapse>
      </NavigationBar>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <LoginButton
            color="rgb(236, 55, 27)"
            shadow="rgb(236, 55, 27, 0.5)"
            block
            outline
            tag="a"
            href="/auth/google"
          >
            Login with Google
          </LoginButton>
          <LoginButton
            color="rgb(64, 96, 183)"
            shadow="rgb(64, 96, 183, 0.5)"
            block
            outline
            tag="a"
            href="/auth/facebook"
          >
            Login with Facebook
          </LoginButton>
          <LoginButton
            color="rgb(0, 156, 250)"
            shadow="rgb(0, 156, 250, 0.5)"
            block
            outline
            tag="a"
            href="/auth/twitter"
          >
            Login with Twitter
          </LoginButton>
          <LoginButton
            color="rgb(36, 41, 47)"
            shadow="rgb(36, 41, 47, 0.5)"
            block
            outline
            tag="a"
            href="/auth/github"
          >
            Login with Github
          </LoginButton>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Header
