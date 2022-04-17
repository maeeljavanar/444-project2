import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalMessage = ({message, show}) => {
    // Modal declarations
    const [visible, setVisible] = useState(show);
    const [text] = useState(message);
    const handleClose = () => setVisible(false);
    //export const handleShow = () => setShow(true);
    //export const handleMessage = (text) => setMessage(text);
    return (<Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton className="secondary">
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer className="tertiary">
            <Button variant="Primary" className="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ModalMessage;