import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Modal, Button } from 'react-bootstrap';

const ServerStatusChecker = () => {
    const [serverStatus, setServerStatus] = useState(true); // Assume server is initially running
    const [showWarning, setShowWarning] = useState(false); // State to control warning modal

    useEffect(() => {
        const socket = io('http://localhost:5000'); // Replace with your backend URL

        socket.on('serverStatus', (status) => {
            setServerStatus(status); // Update server status based on received message
            if (!status) {
                setShowWarning(true); // Show warning modal if server is down
            }
        });

        return () => {
            socket.disconnect(); // Clean up socket connection on component unmount
        };
    }, []);

    const handleClose = () => setShowWarning(false);

    return (
        <>
            <Modal show={showWarning} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Server Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The server is not running. Please start the server.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ServerStatusChecker;