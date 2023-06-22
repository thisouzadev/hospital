import React, { useEffect, useState } from "react";
import EmployeeServiceModal from "./modal/EmployeeServiceModal";
import MedicalEmployeeModal from "./modal/MedicalEmployeeModal";
import { Button } from "react-bootstrap";
import ConfirmationModal from "./modal/ConfirmationModal";
import EmployeeService from "../../service/employee.service";
import Loading from "../../components/loading";
import {
  BsFillPersonPlusFill,
  BsTrashFill,
  BsPencilFill,
} from "react-icons/bs";

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
  }, [showDeleteModal]);

  const handleSaveEmployee = (employee: CreateEmployee) => {
    // Lógica para salvar o funcionário
    console.log(employee);
  };

  const handleConfirmDeleteEmployee = async (id: string) => {
    console.log("deleted", id);

    // Lógica para excluir o funcionário com o ID fornecido
    try {
      const service = new EmployeeService();
      return await service.deletedEmployee(id);
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
        <Button
          onClick={() => setShowModalCreatEmployeer(true)}
          variant="primary"
        >
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
                  <Button
                    variant="primary"
                    style={{ marginRight: "10px" }}
                    className="d-flex items-center gap-2"
                  >
                    <BsPencilFill />
                    Editar
                  </Button>
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
