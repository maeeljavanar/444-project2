import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/Bootstrap.scss';
import '../styles/Theme.css';
import '../styles/Login.css';
import Logo from "../assets/LibraryLogo.png";
import ModalMessage from './Modal';
import axios from "axios";

export default function Login() {
    // Declarations
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const sendModalData = (value) => {
        setShow(value)
    }

    // Run on document load
    useEffect(() => {
        document.title = "Login - Library"
     }, []);

    // Validate the username and password
    function validateForm() {
        return username && password.length >= 8;
    }

    // Submit the data to the backend and get a token back
    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username: username,
                password: password
            });
            let token = response.data.token;
            if(token) {
                localStorage.setItem("token", token)
                window.location.reload();
            } else {
                setMessage("Login Failed. Try Again!")
                setShow(true);
            }
            // setUser(jwtDecode(token));
            // console.log(user, token)
            //setToken(token)
        } catch (error) {
            // In case of an error open a model with the message that
            // the login failed.
            console.log(error);
            setMessage("Login Failed. Try Again!")
            setShow(true);
        }
    }
    return (
        <div className="all">
            {show ? <ModalMessage message={message} show={show} sendModalData={sendModalData}/> : null}
            <Form className="primary LoginForm" onSubmit={handleLogin}>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col>
                            <img className="LogoSize" src={Logo} alt="Library Logo"></img>
                        </Col>
                        <Col sm={6}>
                            <h1 className="Logo">The Library</h1>
                            <h4>Login</h4>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button className="secondary" type="submit" disabled={!validateForm()}>
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    )
}