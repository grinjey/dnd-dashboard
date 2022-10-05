import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function FormModalContainer({triggerText, form, formId}) {

    const [show, setShow] = React.useState(false);

    const showModal = () => {  
        setShow(true); 
    };

    const closeModal = () => {
        setShow(false); 
    };

        return (
            <>
            <Button variant="dark" size="sm" onClick={showModal}> {triggerText} </Button>
            <Modal className="" show={show} onHide={closeModal}>
                <Modal.Header className="bg-dark border border-white" closeButton>
                <Modal.Title className="bg-dark text-white">{triggerText}</Modal.Title>
                </Modal.Header >
                <Modal.Body className="bg-dark border border-white">
                {form}
                </Modal.Body>
                <Modal.Footer className="bg-dark border border-white">
                <Button variant="success" type="submit" form={formId} onClick={closeModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
};

export default FormModalContainer;