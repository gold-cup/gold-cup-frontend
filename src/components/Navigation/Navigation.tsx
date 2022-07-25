import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'
import { useGoldCupApi } from '../../hooks'

export const Navigation = () => {
    const {checkIsLoggedIn} = useGoldCupApi()

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/login'
    }

    const rightMarkup = checkIsLoggedIn() ? <Nav.Link onClick={logout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>

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
            <Nav className="justify-content-end">
                {rightMarkup}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
