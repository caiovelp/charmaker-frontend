import {useEffect, useState} from "react";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";

import itemGeralImage from '../../images/items/item-geral.svg';
import alquimiaImage from '../../images/items/alquimia.svg';
import alimentacaoImage from '../../images/items/alimentacao.svg';

const itensImages = {
    Alquimia: alquimiaImage,
    Alimentação: alimentacaoImage,
    ItemGeral: itemGeralImage
}


function InventarioListGroup({ idPersonagem }) {
    const [inventario, setInventario] = useState([]);

    useEffect(() => {
        const fetchInventario = async () => {
            const config = {
                method: "get",
                url: `http://localhost:8080/inventario/${idPersonagem}`,
                header: {}
            };

            try {
                const response = await axios(config);
                const sortedInventario = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setInventario(sortedInventario);
            } catch (error) {
                console.log(error);
            }
        }

        fetchInventario();
    }, []);

    return(
        <Container className="mb-5">
            <Row>
                <Col sm={2}>
                    <h1>Inventário</h1>
                </Col>
            </Row>
            <Row>
                <ListGroup className="mt-3">
                    <ListGroup.Item className="d-flex align-items-center border border-start-0 border-end-0">
                        <Col sm={4} className="text-start mx-3 fw-bold">
                            Equipamento
                        </Col>
                        <Col sm={4} className="text-start mx-3 fw-bold">
                            Valor Unitário
                        </Col>
                        <Col sm={4} className="text-start mx-3 fw-bold">
                            Peso
                        </Col>
                    </ListGroup.Item>
                    {inventario.map((item) => (
                        <ListGroup.Item className="d-flex align-items-center border border-start-0 border-end-0">
                            <Col sm={1}>
                                <Image src={itensImages[item.tipo.replace(" ", "")]}/>
                            </Col>
                            <Col sm={3} className="text-start mx-3 fw-bold">
                                <div>{item.nome}</div>
                                <div><small className="text-secondary">{item.tipo}</small></div>
                            </Col>
                            <Col sm={4} className="text-start mx-3">
                            T$ {item.valor.toFixed(2)}
                            </Col>
                            <Col sm={4} className="text-start mx-3">
                                {item.peso.toFixed(2)} kg
                            </Col>
                        </ListGroup.Item>
                    ))
                    }
                </ListGroup>
            </Row>
        </Container>
    )
}

export default InventarioListGroup;