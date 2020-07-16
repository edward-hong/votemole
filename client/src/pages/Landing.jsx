import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'

const Heading = styled.h1`
  text-align: center;
`

const SubHeading = styled.h2`
  text-align: center;
`

const ImageWrapper = styled(Row)`
  margin-top: 1.5rem;
`

const Footer = styled.footer`
  text-align: center;
  margin: 3rem auto 1.5rem;
`

const Landing = () => (
  <>
    <Container fluid>
      <Heading>VoteMole</Heading>
      <SubHeading>Can You Dig It?</SubHeading>
      <ImageWrapper>
        <Col
          xs={12}
          sm={{ size: 10, offset: 1 }}
          md={{ size: 8, offset: 2 }}
          lg={{ size: 6, offset: 3 }}
        >
          <img
            className="logo-home"
            src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
            alt="Vote Mole logo"
          />
        </Col>
      </ImageWrapper>
    </Container>
    <Footer>
      Made by Edward Hong | <Link to="/privacy_policy">Privacy Policy</Link>
    </Footer>
  </>
)

export default Landing
