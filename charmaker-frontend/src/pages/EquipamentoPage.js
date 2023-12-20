import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";

import EquipamentoListGroup from "../components/ListGroup/EquipamentoListGroup";
import Navbar from "../components/Navbar/Navbar";

import '../styles/EquipamentoPage.css';
import {useParams} from "react-router-dom";

function EquipamentoPage() {
    const { id } = useParams();

    return (
        <>
            <Navbar />
            <Container>
                <h1 className="mt-5">Lista de Equipamentos</h1>
                <Placeholder xs={12} bg="danger" size="xs"/>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Col>
                                <span className="search-fields-title">Nome</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control type="text" placeholder="Nome do Equipamento" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col>
                                <span className="search-fields-title">Custo</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex">
                                <Form.Control className="me-1" type="number" placeholder="Min" />
                                <Form.Control className="ms-1" type="number" placeholder="Max" />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col>
                                <span className="search-fields-title">Peso</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex">
                                <Form.Control className="me-1" type="number" placeholder="Min" />
                                <Form.Control className="ms-1" type="number" placeholder="Max" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <EquipamentoListGroup idPersonagem={id}/>
            </Container>
        </>

    )
}

export default EquipamentoPage;