import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import RacaListGroup from "../ListGroup/RacaListGroup";
import ClasseListGroup from "../ListGroup/ClasseListGroup";
import SelectedCharContext from "../../context/SelectedCharContext";

function CadastroCharModal({show, onHide}) {
    const [key, setKey] = useState('raca');

    const [racaData, setRacaData] = useState([]);
    const [classeData, setClasseData] = useState([]);

    const [selectedRaca, setSelectedRaca] = useState(null);
    const [selectedClasse, setSelectedClasse] = useState(null);

    const navigate = useNavigate();
    const { setSelectedChar } = useContext(SelectedCharContext);

    const handleSave = () => {
        setSelectedChar({ raca: selectedRaca, classe: selectedClasse });
        onHide();
        navigate('/cadastrarPersonagem');
    };

    useEffect(() => {
        let configRaca = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/race',
            headers: { }
        };

        axios.request(configRaca)
            .then((response) => {
                setRacaData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        let configClasse = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/classe',
            headers: { }
        };

        axios.request(configClasse)
            .then((response) => {
                setClasseData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
      <>
          <Modal size="lg" show={show} onHide={onHide}>
              <Modal.Header closeButton>
                  <Modal.Title>Cadastro de personagem</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="raca" title="Raça">
                            <RacaListGroup racaData={racaData} setKey={setKey} setSelectedRaca={setSelectedRaca}/>
                        </Tab>
                      <Tab eventKey="classe" title="Classe">
                            <ClasseListGroup classeData={classeData} setKey={setKey} setSelectedClasse={setSelectedClasse}/>
                        </Tab>
                        <Tab eventKey="habilidades" title="Habilidades">
                            <p>Em construção.</p>
                        </Tab>
                        <Tab eventKey="poderes" title="Poderes">
                            <p>Em construção.</p>
                        </Tab>
                        <Tab eventKey="descricao" title="Descrição">
                            <p>Em construção.</p>
                        </Tab>
                  </Tabs>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                      Cancelar
                  </Button>
                  <Button variant="danger" onClick={handleSave} disabled={!selectedRaca || !selectedClasse}>
                      Salvar Personagem
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
    );
}

export default CadastroCharModal;