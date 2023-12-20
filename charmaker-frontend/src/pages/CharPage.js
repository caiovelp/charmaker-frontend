import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import NavbarDefault from "../components/Navbar/Navbar";
import CharForm from "../components/Form/CharForm";

import '../styles/CharPage.css';

function CharPage () {
    return (
        <html>
            <head>
                <title>CharMaker Personagem</title>
            </head>
            <body>
                <NavbarDefault />
                <Row>
                    <Col></Col>
                    <Col className="d-flex justify-content-center">
                        <div className='mt-3 form-box'>
                            <CharForm/>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </body>
        </html>
    );
}

export default CharPage;