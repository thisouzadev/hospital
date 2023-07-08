import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Button from '../Button';
import Input from '../Input';
import quickTestService from '@/service/quick-tests.service';
import Loading from '../loading';
import { TestResultType } from '@/types/backend.enums';
import { CreateQuickTestDto } from '@/types/backend.dtos';
import { getDate } from '../../utils/date';

const createQuickTestSchema = {
  attendanceId: yup.string().uuid().required(),
  patientId: yup.string().uuid().required(),
  docNumber: yup.string().required(),
  reqUnit: yup.string().required(),
  date: yup.string().required(),
  results: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      result: yup.string().required(),
    }),
  ),
};

interface Props {
  patientId: string
  attendanceId:string
}
const QuickTests = ({ attendanceId, patientId }:Props) => {
  const [isEditing, setIsEditing] = useState(true);

  const queryClient = useQueryClient();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
  } = useQuery({ queryKey: ['test-categories'], queryFn: () => quickTestService.getAllCategories() });

  const {
    data: lastTestsData,
    isLoading: isLoadingLastTests,
  } = useQuery({ queryKey: ['quick-tests', patientId], queryFn: () => quickTestService.getAllQuickTests({ patientId, take: 1 }) });

  const {
    register, handleSubmit, reset, control, formState: { errors }, setValue,
  } = useForm<CreateQuickTestDto>({
    defaultValues: {
      attendanceId,
      patientId,
      docNumber: '',
      reqUnit: '',
      date: getDate(new Date()),
      results: [],
    },
    resolver: yupResolver(yup.object().shape(createQuickTestSchema).required()),
  });

  const { fields } = useFieldArray({
    control,
    name: 'results',
  });

  useEffect(() => {
    const lastTest = lastTestsData?.result[0];
    if (lastTest) {
      reset({
        date: lastTest.date,
        docNumber: lastTest.docNumber,
        reqUnit: lastTest.reqUnit,
        results: lastTest.results,
      });
      setIsEditing(false);
    } else if (categoriesData?.success) {
      const testCategory = categoriesData?.result[0];
      const testList = testCategory?.testList?.split(',') || [];
      const testItems = testList.map((test) => ({ name: test, result: '' }));
      setValue('results', testItems);
      setValue('testCategoryId', testCategory.testCategoryId);
    }
  }, [categoriesData, lastTestsData]);

  const handleResetQuickTests = () => {
    const testList = categoriesData?.result[0]?.testList?.split(',') || [];
    const testItems = testList.map((test) => ({ name: test, result: '' }));
    reset({
      attendanceId,
      patientId,
      docNumber: '',
      reqUnit: '',
      date: getDate(new Date()),
      results: testItems,
      testCategoryId: categoriesData?.result?.[0]?.testCategoryId,
    });
    setIsEditing(true);
  };

  const createQuickTest = useMutation(quickTestService.create, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Teste Rápido registrado com sucesso');
      queryClient.invalidateQueries('quick-tests');
    },
  });

  const onSubmitForm = (testData: CreateQuickTestDto) => {
    createQuickTest.mutate(testData);
  };

  if (isCategoriesLoading || isLoadingLastTests) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        {fields.map((test, index) => (
          <div className="flex" key={test.name}>
            <Input
              md={2}
              className=""
              label={`${test.name}:`}
              {...register(`results.${index}.result`)}
              error={errors.results?.[index]?.result}
              asChild
              disabled={!isEditing}
            >
              <select>
                <option value="" hidden>selecione</option>
                {Object.values(TestResultType).map((result) => (
                  <option key={result} value={result}>{result}</option>
                ))}
              </select>
            </Input>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          md={2}
          label="Un. Solicitante:"
          className=""
          {...register('reqUnit')}
          error={errors.reqUnit}
          disabled={!isEditing}
        />
        <Input md={2} label="Data:" className="" type="date" {...register('date')} error={errors.date} disabled={!isEditing} />
        <Input md={2} label="Nº Doc:" className="" {...register('docNumber')} error={errors.docNumber} disabled={!isEditing} />
        <Button variant="small" onClick={() => handleResetQuickTests()}>Limpar</Button>
        <Button variant="small" onClick={handleSubmit(onSubmitForm)} disabled={!isEditing}>Novo</Button>
      </div>
    </div>
  );
};

export default QuickTests;
