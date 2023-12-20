import Button from 'react-bootstrap/Button';

function CharDeleteButton({ onDelete, disabled }) {
    return (
        <Button variant="danger" onClick={onDelete} disabled={disabled}>
            Deletar Personagem
        </Button>
    )
}

export default CharDeleteButton;