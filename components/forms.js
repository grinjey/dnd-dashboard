import React from "react";
import Form from 'react-bootstrap/Form';

export const PlayerAddForm = ({handleSubmit, setName, setPlayerClass, formId}) => {

    return (
        <Form onSubmit={(e) => handleSubmit(e)} id={formId}>
            <Form.Group 
            className="mb-3" 
            controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Octavian" onChange={(e) => setName(e.currentTarget.value)} autoFocus/>
            </Form.Group>

            <Form.Group
            className="mb-3"
            controlId="playerclass"
            >
            <Form.Label>Player Class</Form.Label>
            <Form.Control type="text" placeholder="Sorc/Cleric" onChange={(e) => setPlayerClass(e.currentTarget.value)} />
            </Form.Group>
        </Form>
    );
};

export const PlayerRemoveForm = ({handleSubmit, setName, setPlayerClass, formId}) => {

    return (
        <Form onSubmit={(e) => handleSubmit(e)} id={formId}>
            <Form.Group 
            className="mb-3" 
            controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Octavian" onChange={(e) => setName(e.currentTarget.value)} autoFocus/>
            </Form.Group>

            <Form.Group
            className="mb-3"
            controlId="playerclass"
            >
            <Form.Label>Player Class</Form.Label>
            <Form.Control type="text" placeholder="Sorc/Cleric" onChange={(e) => setPlayerClass(e.currentTarget.value)}/>
            </Form.Group>
        </Form>
    );
};

export const FightAddForm = ({handleSubmit, setFight, formId}) => {

    return (
        <Form onSubmit={(e) => handleSubmit(e)} id={formId}>
            <Form.Group 
            className="mb-3" 
            controlId="name">
            <Form.Label>Fight Name</Form.Label>
            <Form.Control type="text" placeholder="Octavian" onChange={(e) => setFight(e.currentTarget.value)} autoFocus/>
            </Form.Group>
        </Form>
    );
};