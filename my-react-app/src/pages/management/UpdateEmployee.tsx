import { SubmitHandler } from 'react-hook-form';
import { Employee } from 'types/backend.models';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import employeeService from '../../service/employee.service';
import Loading from '../../components/loading';

const updateSchema = {
  user: yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
  }),
  name: yup.string().required(),
  cpf: yup.string().required(),
  rg: yup.string().required(),
  doctor: yup
    .object()
    .shape({
      specialty: yup.string().required(),
      crm: yup.string().required(),
      cmrStateId: yup.number().required(),
    })
    .nullable(),
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

function UpdateEmployee() {
  const { employeeId } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!employeeId) {
        return;
      }
      const employeeData = await employeeService.getOne(employeeId);
      setEmployee(employeeData);
      setIsLoading(false);
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    if (!employee) {
      return;
    }

    const {
      user: { password, email, role },
      name,
      cpf,
      rg,
      cns,
      mat,
      address: {
        cep, street, streetNumber, cityId, district, stateId,
      },
    } = data;

    let doctor = data.doctor as any;

    if (doctor) {
      const {
        doctorId, specialty, crm, crmStateId,
      } = doctor;
      doctor = {
        doctorId, specialty, crm, crmStateId,
      };
    }

    const result = await employeeService.update(employee.employeeId, {
      user: { password, email, role },
      name,
      cpf,
      rg,
      doctor,
      cns,
      mat,
      address: {
        cep, street, streetNumber, cityId, district, stateId,
      },
    });

    if (result.error) {
      console.log(result.message);
      return;
    }

    navigate('/admin/manage');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <EmployeeForm
          employee={employee}
          handleFormSubmit={onSubmit}
          schema={updateSchema}
          isUpdating
        />
      </div>
    </div>
  );
}

export default UpdateEmployee;
