import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Footer from './FooterC'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import './Home.css'

const Home = () => {
   return (
      <>
         <Navbar bg="white" variant="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
               <Navbar.Brand href="/" className="fw-bold fs-2 text-primary">CaseResolve</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                     <Nav.Link as={Link} to="/" className="text-primary mx-2">Home</Nav.Link>
                     <Nav.Link as={Link} to="/signup" className="text-primary mx-2">SignUp</Nav.Link>
                     <Nav.Link as={Link} to="/login" className="text-primary mx-2">Login</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container fluid className="py-5 bg-light" style={{ minHeight: '80vh' }}>
            <Row className="justify-content-center text-center">
               <Col xs={10} md={8}>
                  <h1 className="fw-bold text-primary mb-3">Your Team's Companion for Complaint Success</h1>
                  <p className="fs-5 text-secondary mb-4">
                     Seamless complaint tracking and real-time updates to ensure service excellence.
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                     <Link to="/signup">
                        <Button variant="primary" size="lg" className="shadow-sm px-4">
                           Get Started
                        </Button>
                     </Link>
                     <Link to="/login">
                        <Button variant="outline-primary" size="lg" className="shadow-sm px-4">
                           Already Registered?
                        </Button>
                     </Link>
                  </div>
               </Col>
            </Row>
         </Container>

         <Footer />
      </>
   )
}

export default Home
