import React from 'react';
import { Navbar, Container, Col, Row, Button } from 'react-bootstrap';
import '../styles/Bootstrap.scss';
import '../styles/NavBar.css'
import Logo from "../assets/LibraryLogo.png";

export default function NavBar() {
    function logout() {
        //localStorage.removeItem("name");
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <Navbar className='Bar'>
            <Container>
                <Navbar.Brand>
                    <Row>
                        <Col md="auto">
                            <img className="LogoImage" src={Logo} alt="Library Logo"></img>
                        </Col>
                        <Col md="auto">
                            <h1 className="Logo">The Library</h1>
                        </Col>
                        <Col md="auto" className="Logout">
                            <Button onClick={logout}>Logout</Button>
                        </Col>
                    </Row>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}