import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import { PlusCircleFill, Check2Circle } from 'react-bootstrap-icons'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import humanoImage from '../../images/races/humano.jpg';
import elfoImage from '../../images/races/elfo.jpg';
import anaoImage from '../../images/races/anao.jpg';

const racaImages = {
    Humano: humanoImage,
    Elfo: elfoImage,
    Anão: anaoImage
}

function RacaListGroup({ racaData, setKey, setSelectedRaca }) {
    const handleSelectedRace = (raca) => {
        setSelectedRaca(raca);
        setKey('classe');
    }

    return (
        racaData.length > 0 ? (
            <ListGroup className="racaListGroup">
                {racaData.map((raca, index) => (
                    <ListGroup.Item key={index}>
                        <Card className="border-0">
                            <Card.Body className="d-flex align-items-center justify-content-between p-0">
                                <div className="d-flex align-items-center">
                                    <Image className="my-2 ms-2" src={racaImages[raca.nome]} rounded/>
                                    <h5 className="fw-bold ms-2">{raca.nome}</h5>
                                </div>
                                <div className="d-flex align-items-center">
                                    <PlusCircleFill className="fs-2 mx-2 hoverEffect"/>
                                    <Check2Circle className="fs-2 mx-2 hoverEffect" onClick={() => handleSelectedRace(raca)}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        ) : (
            <Row className="my-3">
                <Col></Col>
                <Col>
                    <Spinner animation="grow" variant="danger"/>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="danger"/>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="danger"/>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="danger"/>
                </Col>
                <Col></Col>
            </Row>
        )
    );
}

export default RacaListGroup;