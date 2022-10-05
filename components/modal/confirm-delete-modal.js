import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ConfirmDeleteModal({triggerText, onSubmit, itemToDelete}) {

    const [show, setShow] = React.useState(false);

    const showModal = () => {  
        setShow(true); 
    };

    const closeModal = () => {
        setShow(false); 
    };

    const handleSubmit = () => {
        onSubmit();
        closeModal();
    }

        return (
            <>
            <Button variant="dark" size="sm" onClick={showModal}> {triggerText} </Button>
            <Modal className="border border-danger" show={show} onHide={closeModal}>
                <Modal.Header className="bg-dark border border-danger" closeButton>
                <Modal.Title className="bg-dark text-white-50">{triggerText}</Modal.Title>
                </Modal.Header >
                <Modal.Body className="bg-dark border border-danger">
                <div className="text-white">Are you sure you want to delete {itemToDelete} ?</div>
                </Modal.Body>

                <Modal.Footer className="bg-dark border border-danger">
                <Button variant="danger" onClick={handleSubmit}>Delete</Button>
                <Button variant="success"onClick={closeModal}>Cancel</Button>
                </Modal.Footer>

            </Modal>
            </>
        );
};

export default ConfirmDeleteModal;