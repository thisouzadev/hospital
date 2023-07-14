import { PropsWithChildren } from 'react';

import { AttendanceStatus } from '../../types/backend.enums';

import { isoToString } from '../../utils/date';
import { IAttendance } from '@/types/backend.interfaces';

const Cell = ({ children }: PropsWithChildren) => (
  <td>
    {children}
  </td>
);

interface ISearchParams {
  doctor: string,
  specialty:string,
  startDate: string,
  endDate: string,
}

interface AttendanceTableProps {
  attendances: IAttendance[],
  searchParams: ISearchParams
  // ref: React.MutableRefObject<null>
}

const AttendancePrintTable = (
  {
    attendances,
    searchParams,
    // ref,
  }:AttendanceTableProps,
) => (
  <div className="bg-white p-10 w-[210mm]">
    <div className="text-2xl font-bold mb-5 w-full text-center">Listagem de Agendamentos</div>
    <div className=" mb-5 flex justify-center gap-9 border rounded-md">
      <div>
        <span className="font-bold">
          Início:
        </span>
        <span>
          {isoToString(searchParams.startDate)}
        </span>
      </div>
      <div>
        <span className="font-bold">
          Fim:
        </span>
        <span>
          {isoToString(searchParams.endDate)}
        </span>
      </div>

      <div>
        <span className="font-bold">
          Especialidade:
        </span>
        <span>
          {searchParams.specialty || 'Todas'}
        </span>
      </div>

      <div>
        <span className="font-bold">
          Médico:
        </span>
        <span>
          {searchParams.doctor || 'Todos'}
        </span>
      </div>

    </div>
    <table className="text-md w-full table-auto text-left">
      <thead className="w-full font-bold">
        <tr className="">
          <Cell>
            Paciente
          </Cell>
          <Cell>
            Especialidade
          </Cell>
          <Cell>
            Nº Atendimento
          </Cell>
          <Cell>
            Atendido
          </Cell>
          <Cell>
            Data:
          </Cell>
        </tr>
      </thead>
      <tbody>
        {
          attendances.map((attendance) => (
            <tr key={attendance.attendanceId} className="border-b">
              <Cell>
                {attendance.patient.name}
              </Cell>
              <Cell>
                {attendance.doctor.specialty}
              </Cell>
              <Cell>
                {attendance.attendanceNumber}
              </Cell>
              <Cell>
                {attendance.status === AttendanceStatus.FINISHED ? 'Sim' : 'Não'}
              </Cell>
              <Cell>
                {isoToString(attendance.attendanceDate)}
              </Cell>
            </tr>
          ))
        }
      </tbody>
    </table>
    <div className=" mt-5 flex justify-center gap-9 border rounded-md">
      <div>
        <span className="">Total de registros:</span>
        <span className="">{attendances.length}</span>
      </div>
      <div>
        <span className="">Total de atendidos:</span>
        <span className="">{attendances.filter((a) => a.status === AttendanceStatus.FINISHED).length}</span>
      </div>
    </div>
  </div>
);

export default AttendancePrintTable;
