import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavbarDefault from "../components/Navbar/Navbar";
import CadastroButton from "../components/Button/CadastroCharButton";
import CharCardsContainer from "../components/Container/CharCardsContainer";

import '../styles/HomePage.css';

function HomePage() {
  return (
    <html>
        <head>
            <title>CharMaker Home</title>
        </head>
        <body>
            <NavbarDefault />
            <Row className="mt-4 ms-5">
                <Col>
                    <h1>Personagens</h1>
                </Col>
                <Col></Col>
                <Col>
                    <CadastroButton />
                </Col>
            </Row>
            <CharCardsContainer />
        </body>
    </html>
  );
}

export default HomePage;