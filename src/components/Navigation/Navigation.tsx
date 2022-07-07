import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'

export const Navigation = () => {
    return (
        <Navbar bg="dark" variant='dark' expand="lg">
        <Container>
            <Navbar.Brand href="#home">Gold Cup</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/teams">Teams</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
