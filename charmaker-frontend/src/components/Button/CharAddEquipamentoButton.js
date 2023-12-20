import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

function CharAddEquipamentoButton({ idPersonagem, disabled }) {
    const navigate = useNavigate();

    const handleAddEquipment = () => {
        navigate(`/equipamentos/${idPersonagem}`);
    }

    return (
        <Button variant="warning" disabled={disabled} onClick={handleAddEquipment}>
            Adicionar Equipamento
        </Button>
    )
}

export default CharAddEquipamentoButton;