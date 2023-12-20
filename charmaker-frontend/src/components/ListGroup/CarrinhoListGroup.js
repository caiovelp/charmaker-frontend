import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

import {X} from 'react-bootstrap-icons'

import itemGeralImage from '../../images/items/item-geral.svg';
import alquimiaImage from '../../images/items/alquimia.svg';
import alimentacaoImage from '../../images/items/alimentacao.svg';

const itensImages = {
    Alquimia: alquimiaImage,
    Alimentação: alimentacaoImage,
    ItemGeral: itemGeralImage
}


function CarrinhoListGroup({ personagemId, carrinhoId }) {
    const [equipamentosCarrinho, setEquipamentosCarrinho] = useState([]);
    const [personagem, setPersonagem] = useState([]);

    const navigate = useNavigate();

    const handleQuantityChange = (id, newQuantity) => {
        setEquipamentosCarrinho(prevEquipamentos => prevEquipamentos.map(equipamento =>
            equipamento.id === id ? {...equipamento, quantidade: newQuantity} : equipamento
        ));
    };

    const total = equipamentosCarrinho.reduce((total, equipamentoCarrinho) => {
        return total + (equipamentoCarrinho.equipamento.valor * equipamentoCarrinho.quantidade);
    }, 0);

    useEffect(() => {
        const fetchEquipamentosCarrinho = async () => {
            const config = {
                method: "get",
                url: `http://localhost:8080/equipamentoCarrinho/${carrinhoId}`,
                header: {}
            };

            try {
                const response = await axios(config);
                const sortedEquipamentosCarrinho = response.data.sort((a, b) => a.equipamento.nome.localeCompare(b.equipamento.nome));
                setEquipamentosCarrinho(sortedEquipamentosCarrinho);
                await getPersonagem(personagemId);
            } catch (error) {
                console.log(error);
            }
        }

        const getPersonagem = async (personagemId) => {
            try {
                const config = {
                    method: "get",
                    url: `http://localhost:8080/personagens/${personagemId}`,
                    header: {}
                };

                const response = await axios(config);
                setPersonagem(response.data);
            } catch (error) {

            }
        }

        fetchEquipamentosCarrinho();
    }, []);

    const handleVoltarButtonClick = async () => {
        for (const equipamentoCarrinho of equipamentosCarrinho) {
            let config = {
                method: "put",
                url: `http://localhost:8080/equipamentoCarrinho/${equipamentoCarrinho.equipamento.id}/${equipamentoCarrinho.carrinho.id}/${equipamentoCarrinho.quantidade}`,
                headers: {}
            }

            await axios(config)
                .then((response) => {
                    console.log(response);
                    navigate(`/equipamentos/${personagemId}`);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const handleSuccessButtonClick = async (personagemId) => {
        let equipamentos = equipamentosCarrinho.map(item => item.equipamento);

        let config = {
            method: "put",
            url: `http://localhost:8080/inventario/${personagemId}`,
            header: {
                "Content-Type": "application/json"
            },
            data: equipamentos
        }

        await axios(config)
            .then(async (response) => {
                await deleteEquipamentosOnCarrinho();
                navigate(`/editarPersonagem/${personagemId}`)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteEquipamentosOnCarrinho = async () => {
        let config = {
            method: "delete",
            url: `http://localhost:8080/equipamentoCarrinho/${carrinhoId}`,
            header: {}
        }

        try {
            await axios(config);
        } catch (error) {

        }
    }

    const handleRemoveButtonClick = async (equipamentoId) => {
        setEquipamentosCarrinho(prevEquipamentos => prevEquipamentos.filter(equipamentoCarrinho => equipamentoCarrinho.equipamento.id !== equipamentoId));

        let config = {
            method: "delete",
            url: `http://localhost:8080/equipamentoCarrinho/${carrinhoId}/${equipamentoId}`,
            header: {}
        }


        await axios(config).then(() => {
            setEquipamentosCarrinho(prevEquipamentos => prevEquipamentos.filter(equipamento => equipamento.id !== equipamentoId));
        })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Container>
                <h2 className="text-start mt-4">Carrinho de Equipamentos - {personagem.nome}</h2>
                <ListGroup className="mt-4">
                    <ListGroup.Item className="d-flex align-items-center border border-start-0 border-end-0">
                        <Col sm={3} className="text-start mx-3 fw-bold">
                            Equipamento
                        </Col>
                        <Col sm={2} className="text-start mx-3 fw-bold">
                            Valor Unitário
                        </Col>
                        <Col sm={2} className="text-start mx-3 fw-bold">
                            Quantidade
                        </Col>
                        <Col sm={2} className="text-start mx-3 fw-bold">
                            Valor Total
                        </Col>
                        <Col sm={2} className="text-start mx-3 fw-bold">
                            Remover
                        </Col>
                    </ListGroup.Item>
                    {equipamentosCarrinho.map(equipamentoCarrinho => (
                        <ListGroup.Item className="d-flex align-items-center" key={equipamentoCarrinho.id}>
                            <Col sm={1}>
                                <Image src={itensImages[equipamentoCarrinho.equipamento.tipo.replace(" ", "")]}/>
                            </Col>
                            <Col sm={2} className="text-start mx-3 fw-bold">
                                <h6 className="mb-0 pb-0">{equipamentoCarrinho.equipamento.nome}</h6>
                                <small className="text-secondary">{equipamentoCarrinho.equipamento.tipo}</small>
                            </Col>
                            <Col sm={2} className="text-start mx-3 fw-bold">
                                <h6 className="mb-0 pb-0">T$ {equipamentoCarrinho.equipamento.valor.toFixed(2)}</h6>
                            </Col>
                            <Col sm={2} className="text-start mx-3 fw-bold">
                                <FormControl
                                    type="number"
                                    value={equipamentoCarrinho.quantidade}
                                    onChange={(e) => handleQuantityChange(equipamentoCarrinho.id, e.target.value)}
                                />
                            </Col>
                            <Col sm={2} className="text-start mx-3 fw-bold">
                                <h6 className="mb-0 pb-0">T$ {(equipamentoCarrinho.equipamento.valor * equipamentoCarrinho.quantidade).toFixed(2)}</h6>
                            </Col>
                            <Col sm={2} className="text-start mx-3">
                                <Button variant="danger" className="rounded" onClick={() => handleRemoveButtonClick(equipamentoCarrinho.equipamento.id)}>
                                    <X size={20}/>
                                </Button>
                            </Col>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="d-flex align-items-center border border-0">
                        <Col sm={3} className="text-start mx-3 fw-bold">
                            Total
                        </Col>
                        <Col sm={2} className="text-start mx-3 fw-bold"/>
                        <Col sm={2} className="text-start mx-3 fw-bold"/>
                        <Col sm={2} className="text-start mx-3 fw-bold">
                            T$ {total.toFixed(2)}
                        </Col>
                        <Col sm={2} className="text-start mx-3 fw-bold"/>
                    </ListGroup.Item>
                </ListGroup>
                <Row className="justify-content-evenly align-items-center mt-4">
                    <Col xs="auto">
                        <Button variant="secondary" onClick={handleVoltarButtonClick}>
                            Voltar
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="success" onClick={() => handleSuccessButtonClick(personagem.id)}>
                            Adicionar ao personagem
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CarrinhoListGroup;