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
                <Modal.Header className="bg-dark" closeButton>
                <Modal.Title className="bg-dark text-white-50">{triggerText}</Modal.Title>
                </Modal.Header >
                <Modal.Body className="bg-dark">
                {form}
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                <Button variant="secondary" type="submit" form={formId} onClick={closeModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
};

const TriggerButton = ({triggerText, showModal}) => {

    return (
        <Button variant="dark" size="sm" onClick={showModal}> {triggerText} </Button>
    );

};

export default FormModalContainer;