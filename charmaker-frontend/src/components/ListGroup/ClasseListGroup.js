import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import { PlusCircleFill, Check2Circle } from 'react-bootstrap-icons'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import arcanistaImage from '../../images/classes/arcanista.svg';
import barbaroImage from '../../images/classes/barbaro.svg';
import bardoImage from '../../images/classes/bardo.svg';

const classeImages = {
    Arcanista: arcanistaImage,
    Bárbaro: barbaroImage,
    Bardo: bardoImage
}

function ClasseListGroup({ classeData, setKey, setSelectedClasse }) {
    const handleSelectedClasse = (classe) => {
        setSelectedClasse(classe);
        setKey('habilidades');
    }

    return (
        classeData.length > 0 ? (
            <ListGroup className="classeListGroup">
                {classeData.map((classe, index) => (
                    <ListGroup.Item key={index}>
                        <Card className="border-0">
                            <Card.Body className="d-flex align-items-center justify-content-between p-0">
                                <div className="d-flex align-items-center">
                                    <Image className="my-2 ms-2 imageClass" src={classeImages[classe.nome]} rounded/>
                                    <h5 className="fw-bold ms-2">{classe.nome}</h5>
                                </div>
                                <div className="d-flex align-items-center">
                                    <PlusCircleFill className="fs-2 mx-2 hoverEffect"/>
                                    <Check2Circle className="fs-2 mx-2 hoverEffect" onClick={() => handleSelectedClasse(classe)}/>
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

export default ClasseListGroup;