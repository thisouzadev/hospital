import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  BsFillPersonPlusFill,
  BsTrashFill,
  BsPencilFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UserRole } from "types/backend.enums";
import ConfirmationModal from "./modal/ConfirmationModal";
import EmployeeService from "../../service/employee.service";
import Loading from "../../components/loading";

type Employee = {
  userId: string;
  name: string;
  user: { role: UserRole };
  employeeId: string;
};

function Management() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameQuery, setNameQuery] = useState("");
  const [otherQuery, setOtherQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

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

  const handleFilterEmployees = () => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
        (employee.cpf.includes(otherQuery) ||
          employee.rg.includes(otherQuery) ||
          employee.cns.includes(otherQuery))
    );
    setFilteredEmployees(filtered);
  };

  const handleClearFilter = () => {
    setNameQuery("");
    setOtherQuery("");
    setFilteredEmployees(employees);
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

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
          onClick={() => navigate("cadastrar")}
          variant="primary"
          className="d-flex items-center gap-2"
        >
          <BsFillPersonPlusFill /> Registrar Funcionário
        </Button>
      </div>
      <div
        className="table-responsive-md mx-auto"
        style={{ width: "fit-content" }}
      >
        <Form.Group controlId="nameQuery">
          <Form.Control
            type="text"
            placeholder="Buscar por Nome"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="otherQuery">
          <Form.Control
            type="text"
            placeholder="Buscar por CPF, RG ou CNS"
            value={otherQuery}
            onChange={(e) => setOtherQuery(e.target.value)}
          />
        </Form.Group>
        <div style={{ marginBottom: "10px" }}>
          <Button variant="primary" onClick={handleFilterEmployees}>
            Filtrar
          </Button>{" "}
          <Button variant="secondary" onClick={handleClearFilter}>
            Limpar Filtro
          </Button>
        </div>
        <table className="table table-bordered table-striped table-hover ">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
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
