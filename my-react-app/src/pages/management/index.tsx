import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import EmployeeServiceModal from "./modal/EmployeeServiceModal";
import MedicalEmployeeModal from "./modal/MedicalEmployeeModal";
import { Button } from "react-bootstrap";
import ConfirmationModal from "./modal/ConfirmationModal";
import EmployeeService from "../../service/employee.service";
import Loading from "../../components/loading";

type CreateEmployeeService = {
  cpf: string;
  rg: string;
  email: string;
};

type Employee = {
  id: number;
  nome: string;
  cargo: string;
};

type CreateEmployeeMedic = {
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
function Management() {
  const [showModalService, setShowModalService] = useState(false);
  const [showModalDoctor, setShowModalDoctor] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const service = new EmployeeService();
        const response = await service.getAllEmployee();
        setEmployees(response.data);
        setLoading(false); // Indicar que os dados foram carregados
        console.log("employees", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);
  const handleSaveEmployeeService = (employee: CreateEmployeeService) => {
    // Lógica para salvar o funcionário
    console.log(employee);
  };
  const handleSaveEmployeeDoctor = (employee: CreateEmployeeMedic) => {
    // Lógica para salvar o funcionário
    console.log(employee);
  };

  const handleConfirmDeleteEmployee = (id: number) => {
    console.log(id);

    // Lógica para excluir o funcionário com o ID fornecido

    setShowDeleteModal(false);
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button onClick={() => setShowModalService(true)} variant="primary">
          Registrar Funcionário de atendimento
        </Button>
        <EmployeeServiceModal
          show={showModalService}
          onClose={() => setShowModalService(false)}
          onSave={handleSaveEmployeeService}
        />
        <Button onClick={() => setShowModalDoctor(true)} variant="primary">
          Registrar Funcionário de Medicina
        </Button>
        <MedicalEmployeeModal
          show={showModalDoctor}
          onClose={() => setShowModalDoctor(false)}
          onSave={handleSaveEmployeeDoctor}
        />
      </div>
    </div>
  );
}

export default Management;

{
  /* <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              {keys.map((key) => (
                <td key={key}>{employee[key]}</td>
              ))}
              <td>
                <Button variant="primary" style={{ marginRight: "10px" }}>
                  Editar
                </Button>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  variant="danger"
                >
                  Deletar
                </Button>
                <ConfirmationModal
                  show={showDeleteModal}
                  onCancel={() => setShowDeleteModal(false)}
                  onConfirm={handleConfirmDeleteEmployee}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}
