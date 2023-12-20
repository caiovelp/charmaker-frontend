import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import SelectedCharContext from "../../context/SelectedCharContext";
import CharFormSchema from "../../schema/CharFormSchema";

function CharForm () {
    const { selectedChar } = useContext(SelectedCharContext);
    const [nome, setNome] = useState('');
    const [nivel, setNivel] = useState(1);

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const isFormFilled = nome !== '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {success, error} = CharFormSchema.safeParse({nome, nivel});

        if (success) {
            setErrorMessage(null);

            const dataPersonagem = {
                nome,
                raca: {id: selectedChar.raca.id},
                classe: {id: selectedChar.classe.id},
                nivel: 1
            }

            const configPersonagem = {
                method: 'post',
                url: 'http://localhost:8080/personagens',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataPersonagem
            };

            const configCarrinho = {
                method: 'post',
                url: 'http://localhost:8080/carrinho',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const configInventario = {
                method: 'post',
                url: 'http://localhost:8080/inventario',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                // Cria o personagem
                const responsePersonagem = await axios.request(configPersonagem);

                // Cria o carrinho do personagem
                let idPersonagem = responsePersonagem.data.id;
                configCarrinho['data'] = {
                    personagem: {id: idPersonagem}
                }
                const responseCarrinho = await axios.request(configCarrinho);

                // Cria o inventário do personagem
                configInventario['data'] = {
                    personagem: {id: idPersonagem}
                }
                const responseInventario = await axios.request(configInventario);

                navigate('/');

            } catch (error) {

            }
        } else {
            setErrorMessage(error.formErrors.fieldErrors.nome[0]);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRaca">
                <Form.Label className="fw-bold">Raça</Form.Label>
                <Form.Control type="text" value={selectedChar.raca.nome || ''} readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClasse">
                <Form.Label className="fw-bold">Classe</Form.Label>
                <Form.Control type="text" value={selectedChar.classe.nome || ''} readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNivel">
                <Form.Label className="fw-bold">Nível</Form.Label>
                <Form.Control type="number" value={1} readOnly />
                <Form.Text className="text-muted">
                    Todos os personagens começam no nível 1.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNome">
                <Form.Label className="fw-bold">Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome do personagem" value={nome} onChange={e => setNome(e.target.value)} />
            </Form.Group>

            <Button variant="warning" type="submit" className="submit-button" disabled={!isFormFilled}>
                Cadastrar
            </Button>
            {errorMessage && <Alert className="mt-1" variant="danger">{errorMessage}</Alert>}
        </Form>
    );
}

export default CharForm;