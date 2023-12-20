import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import ListGroup from "react-bootstrap/ListGroup";
import Image from 'react-bootstrap/Image';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from "react-bootstrap/Tooltip";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";

import { InfoCircleFill, BagPlusFill, BagDashFill, BagCheckFill } from 'react-bootstrap-icons'

import itemGeralImage from '../../images/items/item-geral.svg';
import alquimiaImage from '../../images/items/alquimia.svg';
import alimentacaoImage from '../../images/items/alimentacao.svg';

const itensImages = {
    Alquimia: alquimiaImage,
    Alimentação: alimentacaoImage,
    ItemGeral: itemGeralImage
}

function EquipamentoListGroup({ idPersonagem }) {
    const [equipamentos, setEquipamentos] = useState([]);
    const [carrinhoId, setCarrinhoId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [show, setShow] = useState({});
    const target = useRef({});

    const [itemCount, setItemCount] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipamentos = async () => {
            const config = {
                method: "get",
                url: "http://localhost:8080/equipamentos",
                header: {}
            };

            try {
                const response = await axios(config);
                const sortedEquipamentos = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setEquipamentos(sortedEquipamentos);
                await fetchEquipamentosOnCarrinho();
            } catch (error) {

            }
        }

        const fetchEquipamentosOnCarrinho = async () => {
            let configGetCarrinhoByPersonagemId = {
                method: "get",
                url: `http://localhost:8080/carrinho/${idPersonagem}`,
                header: {}
            };

            const response = await axios(configGetCarrinhoByPersonagemId);
            let carrinho = response.data;
            setCarrinhoId(carrinho.id);

            const config = {
                method: "get",
                url: `http://localhost:8080/equipamentoCarrinho/${carrinho.id}`,
                header: {}
            }

            try {
                const response = await axios(config);
                const equipamentosCarrinho = response.data;

                // Update itemCount state with quantities of equipment in the cart
                let newItemCount = {};
                for (let item of equipamentosCarrinho) {
                    newItemCount[item.equipamento.id] = item.quantidade;
                }
                setItemCount(newItemCount);

            } catch (error) {

            }
        }

        fetchEquipamentos();
    }, []);

    const totalPages = Math.ceil(equipamentos.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const showTooltip = (id) => {
        setShow(prevShow => ({...prevShow, [id]: true}));
    };

    const hideTooltip = (id) => {
        setShow(prevShow => ({...prevShow, [id]: false}));
    };

    const incrementItemCount = (id) => {
        setItemCount(prevItemCount => ({...prevItemCount,[id]: (prevItemCount[id] || 0) + 1}));
    }

    const decrementItemCount = (id) => {
        setItemCount(prevItemCount => ({...prevItemCount,[id]: Math.max((prevItemCount[id] || 0) - 1, 0)}));
    }

    const handleBagCheckClick = async () => {
        const equipamentosSelecionados = equipamentos.filter(equipamento => itemCount[equipamento.id] > 0);

        try {
            for (const equipamento of equipamentosSelecionados) {
                let quantidade = itemCount[equipamento.id];
                let equipamentoId = equipamento.id;

                let data = {
                    quantidade: quantidade,
                    equipamento: {id: equipamentoId},
                    carrinho: {id: carrinhoId}
                }

                let configPostCarrinhoEquipamento = {
                    method: "post",
                    url: "http://localhost:8080/equipamentoCarrinho",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                }

                await axios(configPostCarrinhoEquipamento);
            }
            navigate(`/carrinho/${idPersonagem}/${carrinhoId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <ListGroup className="mt-3 div-scroll">
                {equipamentos.slice(start, end).map((equipamento, index) => (
                    <ListGroup.Item className="d-flex align-items-center" key={index}>
                        <Col sm={1}>
                            <Image src={itensImages[equipamento.tipo.replace(" ", "")]}/>
                        </Col>
                        <Col sm={3} className="text-start mx-2 fw-bold">
                            <h6 className="mb-0 pb-0">{equipamento.nome}</h6>
                            <small className="text-secondary">{equipamento.tipo}</small>
                        </Col>
                        <Col sm={3} className="text-start mx-2">
                            <h6 className="mb-0 pb-0">T$ {equipamento.valor.toFixed(2)}</h6>
                        </Col>
                        <Col sm={2} className="text-center mx-2">
                            <h6 className="mb-0 pb-0">{equipamento.peso.toFixed(2)} kg</h6>
                        </Col>
                        <Col sm={3} className="d-flex justify-content-center mx-2">
                            <Button variant="info" size="sm" className="rounded" ref={el => target.current[equipamento.id] = el} onMouseEnter={() => showTooltip(equipamento.id)} onMouseLeave={() => hideTooltip(equipamento.id)}>
                                <InfoCircleFill size={20}/>
                            </Button>
                            <Overlay target={target.current[equipamento.id]} show={show[equipamento.id]} placement="left">
                                {(props) => (
                                    <Tooltip id="equipment-description" {...props}>
                                        {equipamento.descricao}
                                    </Tooltip>
                                )}
                            </Overlay>
                            <BagDashFill size={20} className="bag-icon-dash mx-2" onClick={() => decrementItemCount(equipamento.id)}/>
                            <span>{itemCount[equipamento.id]}</span>
                            <BagPlusFill size={20} className="bag-icon-plus mx-2" onClick={() => incrementItemCount(equipamento.id)}/>
                        </Col>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Row className="justify-content-between align-items-center mt-4">
                <Col xs="auto">
                    <Pagination>
                        {Array.from({length: totalPages}, (_, index) => (
                            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
                <Col xs="auto">
                    <BagCheckFill size={30} className="bag-icon-check" onClick={handleBagCheckClick}/>
                </Col>
            </Row>
        </>
    )
}

export default EquipamentoListGroup;