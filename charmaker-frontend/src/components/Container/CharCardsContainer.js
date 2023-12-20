import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Search } from 'react-bootstrap-icons';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

const arcanistaIcon = require('../../images/classes/arcanista-card-icon.png');
const barbaroIcon = require('../../images/classes/barbaro-card-icon.png');
const bardoIcon = require('../../images/classes/bardo-card-icon.png');

const classeIcons = {
    Arcanista: arcanistaIcon,
    Bárbaro: barbaroIcon,
    Bardo: bardoIcon
}

function CharCardsContainer() {
    const [personagens, setPersonagens] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersonagens = async () => {
            const config = {
                method: "get",
                url: "http://localhost:8080/personagens",
                header: {}
            };

            try {
                const response = await axios(config);
                setPersonagens(response.data);
            } catch (error) {

            }
        }

        fetchPersonagens();
    }, []);

    const totalPages = Math.ceil(personagens.length / cardsPerPage);
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    const filteredPersonagens = personagens.filter(personagem => personagem.nome.toLowerCase().includes(searchTerm.toLowerCase()));

    const renderTooltip = (props) => (
        <Tooltip id="charCard-tooltip" {...props}>
            Clique para ver mais detalhes do personagem.
        </Tooltip>
    );

    return (
        <Container fluid="md">
            <Row className="border-bottom mb-4 pb-3 d-flex justify-content-center align-items-center">
                <Col xs="auto">
                    <Search size={20}/>
                </Col>
                <Col xs="4">
                    <Form.Control
                        type="text"
                        placeholder="Procure pelo nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            {Array.from({length: Math.ceil(filteredPersonagens.length / 3)}).map((_, rowIndex) => (
                <Row key={rowIndex} className="mb-3 ms-5">
                    {filteredPersonagens.slice(start + rowIndex * 3, Math.min(start + (rowIndex + 1) * 3, end)).map((personagem) => (
                        <Col key={personagem.id} md={4}>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 0, hide: 0 }}
                                overlay={renderTooltip}
                            >
                                <Card className="cardPersonagem" onClick={() => navigate(`editarPersonagem/${personagem.id}`)}>
                                    <Card.Img className="mt-2 cardPersonagem-image" variant="top"
                                              src={classeIcons[personagem.classe.nome]}/>
                                    <Card.Body className="bg-danger rounded-bottom">
                                        <Card.Title>{personagem.nome}</Card.Title>
                                        <Card.Text>{personagem.raca.nome} | {personagem.classe.nome} |
                                            Nível {personagem.nivel}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </OverlayTrigger>
                        </Col>
                    ))}
                </Row>
            ))}
            <Pagination>
                {Array.from({length: totalPages}).map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage}
                                     onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
}

export default CharCardsContainer;