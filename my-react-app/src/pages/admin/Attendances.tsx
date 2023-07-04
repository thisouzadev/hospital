import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useReactToPrint } from 'react-to-print';
import doctorsService from '../../service/doctors.service';
import Button from '../../components/Button';
import { Attendance } from '../../types/backend.models';
import attendanceService from '../../service/attendance.service';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
import AttendancesTable from './AttendanceTable';
import { Panel, PanelHeader, PanelSubHeader } from '../../components/Panel';
import Input from '../../components/Input';
import { months } from '../../utils/date';

interface IDayInterval {
  year: number,
  month: number | '',
  week: number | '',
  day: number | '',
}

const getFullDateInterval = (interval : IDayInterval) => {
  const startMonth = interval.month || 1;

  const endMonth = interval.month || 12;

  const startDay = interval.day || 1;

  const endDay = interval.day || months[endMonth - 1].lastDay;

  const startDate = `${interval.year}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
  const endDate = `${interval.year}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;

  return { startDate, endDate };
};

function Attendances() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [dayInterval, setDayInterval] = useState<IDayInterval>({
    year: 2023,
    month: new Date().getMonth() + 1 as number | '',
    week: '' as number | '',
    day: '' as number | '',
  });

  const [filters, setFilters] = useState<ListAttendanceQueryDto>(
    {
      attendanceDate: '',
      orderBy: 'attendanceDate',
      attendanceStartDate: getFullDateInterval(dayInterval).startDate,
      attendanceEndDate: getFullDateInterval(dayInterval).endDate,
      doctorId: '',
      page: 1,
      take: 10,
    },
  );

  const handleSelectInterval = (e:any) => {
    const { name } = e.target;
    const { value } = e.target;

    const newDayInterval = { ...dayInterval, [name]: value };

    if (newDayInterval.month === '') {
      newDayInterval.day = '';
      newDayInterval.week = '';
    }

    const { startDate, endDate } = getFullDateInterval(newDayInterval);

    setFilters((prev) => ({ ...prev, attendanceStartDate: startDate, attendanceEndDate: endDate }));

    setDayInterval(newDayInterval);
  };

  const doctors = useQuery({ queryKey: ['doctors'], queryFn: doctorsService.getAll });

  const fullSpecialties = doctors?.data?.result.map((doctor) => doctor.specialty) || [];

  const specialties = [...new Set(fullSpecialties)];

  const fetchAttendances = async ({ pageParam = filters }) => attendanceService.getAll(pageParam);

  const { data, fetchNextPage } = useInfiniteQuery(
    {
      queryKey: ['attendances', filters],
      queryFn: fetchAttendances,
      getNextPageParam: (lastPage) => (
        lastPage.meta.pageCount === lastPage.meta.page
          ? undefined
          : ({ ...filters, page: lastPage.meta.page + 1 })),
      enabled: true,
    },
  );
  useEffect(() => {
    fetchNextPage();
  }, [data]);

  const attendances = data?.pages.reduce<Attendance[]>(
    (total, page) => [...total, ...page.result],
    [],
  ) || [];

  const handleChangeFilter = (e:any) => {
    const filterName = e.target.name;
    const filterValue = e.target.value;

    const newFilters = { ...filters, [filterName]: filterValue };

    if (newFilters.doctorId) {
      // newFilters.specialty = ''
    }

    setFilters(newFilters);
  };

  const handleSelectAttendance = (attendance: Attendance) => {
    console.log(attendance);
  };

  return (
    <Panel className="p-2">
      <PanelHeader>Listar Agendamentos</PanelHeader>
      <PanelSubHeader>
        <div className="flex justify-between items-center p-1">
          <div className="flex gap-2 justify-between w-full">
            <Input
              textCenter
              className="bg-transparent w-40"
              md={5}
              asChild
              label="Ano:"
              name="year"
              value={dayInterval.year}
              onChange={handleSelectInterval}
            >
              <select>
                {/* <option value="">Todos</option> */}
                {
                  [...Array(4).keys()].map((year) => year + 2020).map((year) => (
                    <option key={year} value={year} className="bg-transparent appearance-none">{year}</option>
                  ))
                  }
              </select>
            </Input>
            <Input
              textCenter
              className="bg-transparent"
              md={5}
              asChild
              label="Mês:"
              name="month"
              value={dayInterval.month}
              onChange={handleSelectInterval}
            >
              <select>
                <option value="">Todos</option>
                {
                  months.slice(1).map((month) => (
                    <option key={month.id} value={month.id} className="bg-transparent appearance-none">{month.name}</option>
                  ))
                }
              </select>
            </Input>
            <Input
              textCenter
              className="bg-transparent w-44"
              md={5}
              asChild
              label="Semana:"
              name="week"
              value={dayInterval.week}
              onChange={handleSelectInterval}
            >
              <select>
                <option value="">Todas</option>
                {
                  [...Array(5).keys()].map((week) => week + 1).map((week) => (
                    <option key={week} value={week} className="bg-transparent appearance-none">{`${week}ª`}</option>
                  ))
                  }
              </select>
            </Input>
            <Input
              textCenter
              className="bg-transparent"
              md={5}
              asChild
              label="Dia:"
              name="day"
              value={dayInterval.day}
              onChange={handleSelectInterval}
            >
              <select>
                <option value="">Todos</option>
                {
                  [...Array(31).keys()].map((week) => week + 1).map((week) => (
                    <option key={week} value={week} className="bg-transparent appearance-none">{week}</option>
                  ))
                }
              </select>
            </Input>
            <Input
              textCenter
              className="bg-transparent"
              md={5}
              asChild
              name="doctorId"
              value={filters.doctorId}
              onChange={handleChangeFilter}
            >
              <select>
                <option value="" hidden>Médico</option>
                {
                    doctors?.data?.result.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId} className="bg-transparent appearance-none">{doctor.employee.name}</option>
                    ))
                  }
              </select>
            </Input>

            <Input
              textCenter
              className="bg-transparent w-56"
              md={5}
              asChild
            >
              <select>
                <option value="" hidden>Especialidade</option>
                {
                    specialties.map((specialty) => (
                      <option key={specialty} value={specialty} className="bg-transparent appearance-none">{specialty}</option>
                    ))
                  }
              </select>

            </Input>

          </div>
        </div>
      </PanelSubHeader>
      <PanelSubHeader className="p-2">

        <AttendancesTable
          attendances={attendances}
          onSelectAttendance={handleSelectAttendance}
          forPrint
        />

      </PanelSubHeader>
      <div className="w-full flex justify-end py-4">
        <Button className="mx-10" variant="small" onClick={handlePrint}>Imprimir</Button>
      </div>
    </Panel>
  );
}

export default Attendances;
