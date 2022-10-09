import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function FormModalContainer({triggerText, form, border, handleSubmit}) {

    const [show, setShow] = React.useState(false);

    const showModal = () => {  
        setShow(true); 
    };

    const closeModal = () => {
        setShow(false); 
    };

    const onSubmit = (event) => {
        handleSubmit(event);
        closeModal();
    }

        return (
            <>
            <div role="button" onClick={showModal}> {triggerText} </div>
            <Modal className="" show={show} onHide={closeModal}>
                <Modal.Header className={`bg-dark border border-${border}`} closeButton>
                <Modal.Title className="bg-dark text-white">{triggerText}</Modal.Title>
                </Modal.Header >
                <Modal.Body className={`bg-dark border border-${border}`}>
                {form}
                </Modal.Body>
                <Modal.Footer className={`bg-dark border border-${border}`}>
                <Button variant="success" onClick={(e)=> onSubmit(e)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
};

export default FormModalContainer;