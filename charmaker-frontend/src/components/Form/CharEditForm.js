import React, {useState} from 'react';

import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form';

import CharFormSchema from "../../schema/CharFormSchema";
import axios from "axios";
import Button from "react-bootstrap/Button";

function CharEditForm({ personagem }) {
    const [nome, setNome] = useState(personagem.nome);
    const [nivel, setNivel] = useState(personagem.nivel);

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    }

    const handleNivelChange = (event) => {
        setNivel(parseInt(event.target.value, 10));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {success, error} = CharFormSchema.safeParse({nome, nivel});

        if (success) {
            setErrorMessage(null);

            const data = {
                id: personagem.id,
                nome: nome,
                nivel: nivel
            }

            const config = {
                method: 'put',
                url: 'http://localhost:8080/personagens',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            try {
                const response = await axios.request(config);
                if(response) {
                    setSuccessMessage("Personagem editado com sucesso!");
                }

            } catch (error) {

            }
        } else {
            setSuccessMessage(null);
            if (error.formErrors.fieldErrors.nome) {
                setErrorMessage(error.formErrors.fieldErrors.nome[0]);
            }
            else {
                setErrorMessage(error.formErrors.fieldErrors.nivel[0]);

            }
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={nome} onChange={handleNomeChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNivel">
                    <Form.Label>Nível</Form.Label>
                    <Form.Control type="number" value={nivel} onChange={handleNivelChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar
                </Button>
                {errorMessage && <Alert className="mt-1" variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert className="mt-1" variant="success">{successMessage}</Alert>}
            </Form>
        </>

    )
}

export default CharEditForm;