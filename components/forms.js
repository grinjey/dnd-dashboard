import React from "react";
import Form from 'react-bootstrap/Form';

export const PlayerAddForm = ({handleSubmit, setName, formId}) => {

    return (
        <Form className="bg-dark" onSubmit={(e) => handleSubmit(e)} id={formId} >
            <Form.Group 
            className="mb-3 bg-dark" 
            controlId="name">
            <Form.Label className="text-white fw-bold">Name</Form.Label>
            <Form.Control type="text" placeholder="Octavian" onChange={(e) => setName(e.currentTarget.value)} autoFocus/>
            </Form.Group>
        </Form>
    );
};

export const PlayerRemoveForm = ({handleSubmit, setName, formId}) => {

    return (
        <Form className="bg-dark" onSubmit={(e) => handleSubmit(e)} id={formId}>
            <Form.Group 
            className="mb-3" 
            controlId="name">
            <Form.Label className="text-white fw-bold">Name</Form.Label>
            <Form.Control type="text" placeholder="Octavian" onChange={(e) => setName(e.currentTarget.value)} autoFocus/>
            </Form.Group>
        </Form>
    );
};

export const FightAddForm = ({handleSubmit, setFight, formId}) => {

    return (
        <Form className="bg-dark" onSubmit={(e) => handleSubmit(e)} id={formId}>
            <Form.Group 
            className="mb-3" 
            controlId="name">
            <Form.Label className="text-white fw-bold">Fight Name</Form.Label>
            <Form.Control type="text" placeholder="Cornalla" onChange={(e) => setFight(e.currentTarget.value)} autoFocus/>
            </Form.Group>
        </Form>
    );
};