import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AttendanceStatus, AttendanceType } from '@/types/backend.enums';
import { useAppStore } from '../../store';
import Button from '../Button';
import { Attendance } from '@/types/backend.models';
import AttendanceHeader from '../AttendanceHeader';
import attendanceService from '@/service/attendance.service';
import sectorService from '@/service/sector.service';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  attendance:Attendance
}
const ConfirmationModal = ({
  isOpen, setIsOpen, attendance,
}:Props) => {
  const [attendanceType, setAttendanceType] = useState<AttendanceType>(AttendanceType.STANDARD);
  const [sectorId, setSectorId] = useState<string>();

  const queryClient = useQueryClient();

  const [state] = useAppStore();

  const { sectors } = state;

  const updateStatusMutation = useMutation(attendanceService.updateStatus, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Status atualizado com sucesso');
      queryClient.invalidateQueries('attendances');
    },
  });

  const enterSectorMutation = useMutation(sectorService.enterSector, {
    onSuccess: () => {
      // Invalidate and refetch
      updateStatusMutation.mutate({
        attendanceId: attendance.attendanceId,
        type: attendanceType,
        status: AttendanceStatus.CONFIRMED,
      });
      setIsOpen(false);
    },
  });

  const onClickConfirm = () => {
    if (!sectorId || !attendanceType) {
      return;
    }
    enterSectorMutation.mutateAsync({ attendanceId: attendance.attendanceId, sectorId });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[10%] left-[10%] bottom-[10%] right-[10%] shadow-md rounded-[6px] bg-[#E9E9EA] p-[25px] focus:outline-none">
          <Dialog.Title className="m-0 text-xl font-medium ">
            <AttendanceHeader attendance={attendance} />
          </Dialog.Title>
          <Dialog.Description className="mt-[1px]text-[15px] leading-normal flex flex-col" />
          <div className="mb-10">
            <span>
              Informe o tipo de atendimento para o paciente:
            </span>
            <div className="mt-[25px] flex justify-between">
              {Object.values(AttendanceType).map((type) => (
                <button
                  type="button"
                  key={type}
                  className={
                  clsx(
                    'p-3 font-bold rounded-lg text-white w-32',
                    { 'bg-green-600': type === AttendanceType.STANDARD },
                    { 'bg-yellow-600': type === AttendanceType.PRIORITY },
                    { 'bg-red-600': type === AttendanceType.URGENT },
                    { 'ring-4 ring-blue-400': attendanceType === type },
                    { 'opacity-90': attendanceType !== type },

                  )
              }
                  onClick={() => setAttendanceType(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sector-select">
              <p>
                Setor de encaminhamento:
              </p>
              <select name="sector-select" className="p-2 rounded-lg ring-1" value={sectorId} onChange={(e) => setSectorId(e.target.value)}>
                <option value="" hidden>{' '}</option>
                {sectors.map((sector) => (
                  <option
                    key={sector.sectorId}
                    value={sector.sectorId}
                  >
                    {sector.name.toUpperCase()}
                  </option>
                ))}
              </select>

            </label>
            <div className="mt-[25px] flex justify-between" />
          </div>

          <div className="w-full flex justify-center">
            <Button onClick={onClickConfirm} disabled={!sectorId}>Encaminhar</Button>
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none text-xl hover:drop-shadow-md"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModal;
