import {useState} from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import CharEditForm from "../Form/CharEditForm";


function CharEditButton({ personagem, disabled }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={disabled}>
                Editar Personagem
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Personagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CharEditForm personagem={personagem}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CharEditButton;