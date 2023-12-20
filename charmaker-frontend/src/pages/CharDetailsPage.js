import {useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios";

import Spinner from 'react-bootstrap/Spinner';

import CharCardDetails from "../components/Card/CharCardDetails";
import Navbar from "../components/Navbar/Navbar";

import '../styles/CharDetailsPage.css';
import InventarioListGroup from "../components/ListGroup/InventarioListGroup";

function CharDetailsPage() {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/personagens/${id}`)
        .then((response) => {
          setPersonagem(response.data);
        });
  }, [id]);

  if(!personagem) {
    return (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
  }
  else {
      return (
          <html>
              <head>
                  <title>CharMaker Personagem</title>
              </head>
          <body>
            <Navbar />
            <CharCardDetails personagem={personagem}/>
            <InventarioListGroup idPersonagem={id}/>
          </body>
          </html>
  )
  }
}

export default CharDetailsPage;