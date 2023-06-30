import { useForm, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { Patient } from '../../types/backend.models';
import Input from '../Input';
import { SearchPatientQueryDto } from '../../types/backend.dtos';
import Button from '../Button';
import patientService from '../../service/patient.service';

interface Props {
  onSuccess: (patients: Patient[])=> void
}

const SearchPatients = ({ onSuccess }:Props) => {
  const patientSearch = useForm<SearchPatientQueryDto>({
    defaultValues: { cpf: '', cns: '' },
  });

  const handleSearchPatients = async (data: SearchPatientQueryDto) => {
    const query = { ...data };
    if (!query.attendanceNumber) {
      delete query.attendanceNumber;
    }
    const res = await patientService.searchPatients(query);

    onSuccess(res.result);
  };

  return (
    <div className="grid grid-cols-12 gap-2">
      <Input md={6} label="Nome:" {...patientSearch.register('name')} className="bg-transparent" />
      <Controller
        control={patientSearch.control}
        name="cpf"
        render={({ field: { onChange, name, value } }) => (
          <Input md={3} label="CPF:" asChild className="bg-transparent">
            <PatternFormat
              format="###.###.###-##"
              name={name}
              value={value}
                      // onChange={onChange}
              onValueChange={(v) => { onChange({ target: { value: v.value } }); }}
            />
          </Input>
        )}
      />
      <Controller
        control={patientSearch.control}
        name="cns"
        render={({ field: { onChange, name, value } }) => (
          <Input md={3} label="CNS:" asChild className="bg-transparent">
            <PatternFormat
              format="### #### #### ####"
              name={name}
              value={value}
                      // onChange={onChange}
              onValueChange={(v) => { onChange({ target: { value: v.value } }); }}
            />
          </Input>
        )}
      />

      <Input md={5} label="Data de atendimento:" {...patientSearch.register('attendanceDate')} className="bg-transparent" type="date" />
      <Input md={5} label="Nº do atendimento:" {...patientSearch.register('attendanceNumber', { valueAsNumber: true })} className="bg-transparent" />
      <Button
        variant="small"
        onClick={patientSearch.handleSubmit(handleSearchPatients)}
      >
        Buscar
      </Button>
    </div>
  );
};

export default SearchPatients;
