import React from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  onCancel: () => void;
  onConfirm: (id: string) => void;
};

const ConfirmationModal: React.FC<Props> = ({ show, onCancel, onConfirm }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Deseja realmente excluir o funcionário?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
