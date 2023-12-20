import { useState } from "react";

import Button from 'react-bootstrap/Button';
import CadastroCharModal from "../Modal/CadastroCharModal";

function CadastroButton() {
    const [modalShow, setModalShow] = useState(false);
    return (
      <>
          <Button variant="secondary" onClick={() => setModalShow(true)}>
              Crie um personagem
          </Button>
          <CadastroCharModal show={modalShow} onHide={() => setModalShow(false)}/>
      </>
    );
}

export default CadastroButton;