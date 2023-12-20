import {useState} from "react";
import axios from "axios";

import Alert from "react-bootstrap/Alert";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import CharEditButton from "../Button/CharEditButton";
import CharDeleteButton from "../Button/CharDeleteButton";

import defaultCharImage from '../../images/character.svg';
import Placeholder from "react-bootstrap/Placeholder";
import CharAddEquipamentoButton from "../Button/CharAddEquipamentoButton";

function CharCardDetails({ personagem }) {
    const [isDeleted, setIsDeleted] = useState(false);

    const [message, setMessage] = useState(null);

    const handleDelete = ()=> {
        axios.delete(`http://localhost:8080/personagens/${personagem.id}`)
            .then((response) => {
                setIsDeleted(true);
                setMessage("Personagem deletado com sucesso!")
            })
            .catch((error) => {
                setMessage(`Erro ao deletar personagem: ${error.message}`);
            });
    }

    return (
        <Container className="d-flex justify-content-center">
            <div>
                <Card className="card-details my-4">
                    <Row className="g-0">
                        <Col md={4}>
                            <Image src={defaultCharImage} />
                        </Col>
                        <Col md={8}>
                            <Card.Body>
                                <Card.Title>{personagem.nome}</Card.Title>
                                <Card.Text>
                                    <p><strong>Raça:</strong> {personagem.raca.nome}</p>
                                    <p><strong>Classe:</strong> {personagem.classe.nome}</p>
                                    <p><strong>Nível:</strong> {personagem.nivel}</p>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <Row className="d-flex justify-content-between">
                    <Col xs="auto">
                        <CharEditButton personagem={personagem} disabled={isDeleted}/>
                    </Col>
                    <Col xs="auto">
                        <CharAddEquipamentoButton idPersonagem={personagem.id} disabled={isDeleted}/>
                    </Col>
                    <Col xs="auto">
                        <CharDeleteButton onDelete={handleDelete} disabled={isDeleted}/>
                    </Col>
                </Row>
                {isDeleted && <Alert variant="success" className="mt-4">{message}</Alert>}
                <Placeholder xs={12} size="xs" bg="danger" />
            </div>
        </Container>
    )
}

export default CharCardDetails;