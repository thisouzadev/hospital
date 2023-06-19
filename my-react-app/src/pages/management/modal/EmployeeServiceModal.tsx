import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

type Employee = {
  nome: string;
  cpf: string;
  rg: string;
  email: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
};

const EmployeeServiceModal: React.FC<Props> = ({ show, onClose, onSave }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [rg, setRG] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const employee: Employee = {
      nome,
      cpf,
      rg,
      email,
    };

    onSave(employee);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Funcionário de Atendimento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="rg">
              <Form.Label>RG</Form.Label>
              <Form.Control
                type="text"
                value={rg}
                onChange={(e) => setRG(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeServiceModal;
