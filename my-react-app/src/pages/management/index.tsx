import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  BsFillPersonPlusFill,
  BsTrashFill,
  BsPencilFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import EmployeeServiceModal from "./modal/EmployeeServiceModal";
import MedicalEmployeeModal from "./modal/MedicalEmployeeModal";
import ConfirmationModal from "./modal/ConfirmationModal";
import EmployeeService from "../../service/employee.service";
import Loading from "../../components/loading";

type Employee = {
  userId: string;
  name: string;
  user: string;
  employeeId: string;
};

type CreateEmployee = {
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
  const [showModalCreatEmployeer, setShowModalCreatEmployeer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const service = await EmployeeService.getAll();
        setEmployees(service);
        setLoading(false); // Indicar que os dados foram carregados
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, [showDeleteModal]);

  const handleSaveEmployee = (employee: CreateEmployee) => {
    // Lógica para salvar o funcionário
    console.log(employee);
  };

  const handleConfirmDeleteEmployee = async (id: string) => {
    // Lógica para excluir o funcionário com o ID fornecido
    try {
      await EmployeeService.delete(id);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
    setShowDeleteModal(false);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button onClick={() => navigate("cadastrar")} variant="primary">
          <BsFillPersonPlusFill /> Registrar Funcionário
        </Button>
        <MedicalEmployeeModal
          show={showModalCreatEmployeer}
          onClose={() => setShowModalCreatEmployeer(false)}
          onSave={handleSaveEmployee}
        />
      </div>
      <div
        className="table-responsive-md mx-auto"
        style={{ width: "fit-content" }}
      >
        <table className="table table-bordered table-striped table-hover ">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.name}</td>
                <td>{employee.user.role}</td>
                <td className="flex">
                  <Link to={`editar/${employee.employeeId}`}>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      className="d-flex items-center gap-2"
                    >
                      <BsPencilFill />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    variant="danger"
                    className="d-flex items-center gap-2"
                  >
                    <BsTrashFill /> Deletar
                  </Button>
                  <ConfirmationModal
                    show={showDeleteModal}
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={() =>
                      handleConfirmDeleteEmployee(employee.employeeId)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Management;
