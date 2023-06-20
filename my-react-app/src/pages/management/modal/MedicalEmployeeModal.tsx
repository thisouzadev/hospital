import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

type MedicalEmployee = {
  nome: string;
  cpf: string;
  rg: string;
  cargo: string;
  especialidade: string;
  docTipo: string;
  docNumero: string;
  cns: string;
  mat: string;
  email: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: (employee: MedicalEmployee) => void;
};

const MedicalEmployeeModal: React.FC<Props> = ({ show, onClose, onSave }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [rg, setRG] = useState("");
  const [cargo, setCargo] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [docTipo, setDocTipo] = useState("");
  const [docNumero, setDocNumero] = useState("");
  const [cns, setCNS] = useState("");
  const [mat, setMat] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const employee: MedicalEmployee = {
      nome,
      cpf,
      rg,
      cargo,
      especialidade,
      docTipo,
      docNumero,
      cns,
      mat,
      email,
    };

    onSave(employee);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Dialog className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Funcionário Médico</Modal.Title>
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
            <Row>
              <Form.Group as={Col} controlId="cargo">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  as="select"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                >
                  <option value="">Selecione o cargo</option>
                  <option value="Médico">Médico</option>
                  <option value="Enfermeiro">Enfermeiro</option>
                  <option value="Técnico em Enfermagem">
                    Técnico em Enfermagem
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="especialidade">
                <Form.Label>Especialidade</Form.Label>
                <Form.Control
                  as="select"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                >
                  <option value="">Selecione a especialidade</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Dermatologia">Dermatologia</option>
                  <option value="Pediatria">Pediatria</option>
                </Form.Control>
              </Form.Group>
            </Row>
            { cargo==='Médico' && <Row>
              <Form.Group as={Col} controlId="docTipo">
                <Form.Label>Doc. MED/Tipo</Form.Label>
                <Form.Control
                  type="text"
                  value={docTipo}
                  onChange={(e) => setDocTipo(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="docNumero">
                <Form.Label>Doc. N°</Form.Label>
                <Form.Control
                  type="text"
                  value={docNumero}
                  onChange={(e) => setDocNumero(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="cns">
                <Form.Label>CNS</Form.Label>
                <Form.Control
                  type="text"
                  value={cns}
                  onChange={(e) => setCNS(e.target.value)}
                />
              </Form.Group>
            </Row>}

            <Form.Group as={Col} controlId="mat">
              <Form.Label>Mat</Form.Label>
              <Form.Control
                type="text"
                value={mat}
                onChange={(e) => setMat(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="email">
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
      </Modal.Dialog>
    </Modal>
  );
};

export default MedicalEmployeeModal;
