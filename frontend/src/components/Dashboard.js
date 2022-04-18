import React, { useState, useContext, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import '../styles/Bootstrap.scss';
import '../styles/Theme.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'

export default function Dashboard() {
    // Declarations
    const navigate = useNavigate();

    // Run on document load
    useEffect(() => {
        document.title = "Dashboard - Library"
     }, []);

    // Modal declarations
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMessage = (text) => setMessage(text);

    return (
        <div className="all">
            <NavBar />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="secondary">
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer className="tertiary">
                    <Button variant="Primary" className="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='primary'>

            </div>
        </div>
    )
}