import { useMutation } from 'react-query';
import { useAppStore } from '../../store';
import Dialog from '../Dialog';
import sectorService from '@/service/sector.service';
import { IAttendance, ISector } from '@/types/backend.interfaces';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  attendance: IAttendance
  onForwardSuccess?: ()=>void
}

const ForwardDialog = ({
  isOpen, setIsOpen, attendance, onForwardSuccess = () => {},
}:Props) => {
  const [state] = useAppStore();
  const { sectors, currentSector } = state;

  const forwardAttendance = useMutation(sectorService.moveSector, {
    onSuccess: () => {
      // Invalidate and refetch
      onForwardSuccess();
      setIsOpen(false);
    },
  });

  const handleConfirmForward = (sector: ISector) => {
    forwardAttendance.mutate({
      attendanceId: attendance.attendanceId,
      fromSectorId: currentSector?.sectorId as string,
      toSectorId: sector.sectorId,
    });
  };

  const forwardSector = sectors.filter((sector) => sector.sectorId !== currentSector?.sectorId);
  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen} title={`Encaminhar o Paciente: ${attendance.patient.name}`}>
      <div className="flex justify-center gap-4 flex-wrap">
        {forwardSector.map((sector) => (
          <button
            type="button"
            key={sector.sectorId}
            className="ring-1 rounded-lg p-4 hover:bg-slate-100"
            onClick={() => handleConfirmForward(sector)}
          >
            {sector.name.toUpperCase()}
          </button>
        ))}
      </div>
    </Dialog>
  );
};

export default ForwardDialog;
