import React from 'react';
import { Navbar, Container, Col, Row } from 'react-bootstrap';
import '../styles/Bootstrap.scss';
import '../styles/NavBar.css'
import Logo from "../assets/LibraryLogo.png";

export default function NavBar() {
    return (
        <Navbar className='Bar'>
            <Container>
                <Navbar.Brand>
                    <Row>
                        <Col>
                            <img className="LogoImage" src={Logo} alt="Library Logo"></img>
                        </Col>
                        <Col>
                            <h1 className="Logo">The Library</h1>
                        </Col>
                    </Row>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}