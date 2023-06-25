import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { CreateEmployeeDto } from '../../types/backend.dtos';
import { useAppStore } from '../../store';

import EmployeeService from '../../service/employee.service';

import EmployeeForm from './EmployeeForm';

const schema = {
  user: yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
  }),
  name: yup.string().required(),
  cpf: yup.string().required(),
  rg: yup.string().required(),
  doctor: yup.object().shape({
    specialty: yup.string().required(),
    crm: yup.string().required(),
    cmrStateId: yup.number().required(),
  }).strict(),
  cns: yup.string().required(),
  mat: yup.string().required(),
  address: yup.object().shape({
    cep: yup.string().length(8).required(),
    street: yup.string().required(),
    streetNumber: yup.string().required(),
    cityId: yup.number().required(),
    district: yup.string().required(),
    stateId: yup.number().required(),
  }),
};
function CreateEmployee() {
  const navigate = useNavigate();
  const [state] = useAppStore();
  const { currentUser } = state;

  const { employeeId } = useParams();

  const onSubmit: SubmitHandler<CreateEmployeeDto> = async (data) => {
    const result = await EmployeeService.create(data);
    if (result.error) {
      return;
    }
    navigate('/admin/manage');
  };

  const employee = { user: { password: '123456' }, hospitalId: currentUser?.employee.hospital.hospitalId };

  return (
    <div className="w-full">
      <EmployeeForm handleFormSubmit={onSubmit} schema={schema} employee={employee} />
    </div>
  );
}

export default CreateEmployee;
