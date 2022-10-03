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
            <TriggerButton showModal={showModal} triggerText={triggerText}></TriggerButton>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>{triggerText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {form}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form={formId} onClick={closeModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
};

const TriggerButton = ({triggerText, showModal}) => {

    return (
        <Button variant="light" size="sm" onClick={showModal}> {triggerText} </Button>
    );

};

export default FormModalContainer;