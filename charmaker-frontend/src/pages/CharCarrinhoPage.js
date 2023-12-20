import {useParams} from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import CarrinhoListGroup from "../components/ListGroup/CarrinhoListGroup";

function CharCarrinhoPage() {
    const { idPersonagem, idCarrinho } = useParams();
    return (
        <>
            <Navbar />
            <CarrinhoListGroup personagemId={idPersonagem} carrinhoId={idCarrinho} />
        </>
    );
}

export default CharCarrinhoPage;