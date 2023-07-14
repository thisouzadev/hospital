import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useReactToPrint } from 'react-to-print';
import {
  getWeeksInMonth,
} from 'date-fns';
import doctorsService from '../../service/doctors.service';
import Button from '../../components/Button';
import attendanceService from '../../service/attendance.service';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
// import AttendancesTable from './AttendanceTable';
import { Panel, PanelHeader, PanelSubHeader } from '../../components/Panel';
import Input from '../../components/Input';
import { getWeekRange, months } from '../../utils/date';
import AttendancePrintTable from './AttendancePrintTable';
import AttendancesTable from './AttendanceTable';
import { IAttendance } from '@/types/backend.interfaces';

interface IDayInterval {
  year: number,
  month: number | '',
  week: number | '',
  day: number | '',
}

const getFullDateInterval = (interval : IDayInterval) => {
  const startMonth = interval.month || 1;
  const endMonth = interval.month || 12;

  let startDay: number = 1;
  let endDay: number = months[endMonth - 1].lastDay;

  if (interval.month && interval.week) {
    const { weekStartDate, weekEndDate } = getWeekRange(
      interval.year,
      interval.month,
      interval.week,
    );

    return { startDate: weekStartDate, endDate: weekEndDate };
  }

  if (interval.day) {
    startDay = interval.day;
    endDay = interval.day;
  }

  const startDate = `${interval.year}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
  const endDate = `${interval.year}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;

  return { startDate, endDate };
};

function Attendances() {
  const printComponentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
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
      specialty: '',
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

    if (name === 'day') {
      newDayInterval.week = '';
    }

    if (name === 'week') {
      newDayInterval.day = '';
    }

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

  const attendances = data?.pages.reduce<IAttendance[]>(
    (total, page) => [...total, ...page.result],
    [],
  ) || [];

  const handleChangeFilter = (e:any) => {
    const filterName = e.target.name;
    const filterValue = e.target.value;

    const newFilters = { ...filters, [filterName]: filterValue };

    if (filterName === 'specialty') {
      newFilters.doctorId = '';
      // newFilters.specialty = ''
    }

    setFilters(newFilters);
  };

  const doctorName = doctors.data?.result.find((d) => d.doctorId === filters.doctorId)?.employee.name || '';

  const filteredDoctors = doctors?.data?.result.filter(
    (d) => (filters.specialty ? d.specialty === filters.specialty : true),
  ) || [];

  const numberOfWeeks = dayInterval.month
    ? getWeeksInMonth(new Date(dayInterval.year, dayInterval.month, 0), { weekStartsOn: 0 })
    : 0;
  const monthWeeks = [...Array(numberOfWeeks).keys()];

  return (
    <Panel className="p-2">
      <PanelHeader>Listar Agendamentos</PanelHeader>
      <PanelSubHeader>
        <div className="flex justify-between items-center p-1">
          <div className="flex gap-2 justify-between w-full">
            <Input
              textCenter
              className=" w-40"
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
                    <option key={year} value={year} className=" appearance-none">{year}</option>
                  ))
                  }
              </select>
            </Input>
            <Input
              textCenter
              className=""
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
                    <option key={month.id} value={month.id} className=" appearance-none">{month.name}</option>
                  ))
                }
              </select>
            </Input>
            <Input
              textCenter
              className=" w-44"
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
                 monthWeeks.map((week) => week + 1).map((week) => (
                   <option key={week} value={week} className=" appearance-none">{`${week}ª`}</option>
                 ))
                  }
              </select>
            </Input>
            <Input
              textCenter
              className=""
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
                  [...Array(31).keys()].map((day) => day + 1).map((day) => (
                    <option key={day} value={day} className=" appearance-none">{day}</option>
                  ))
                }
              </select>
            </Input>

            <Input
              textCenter
              className=" w-56"
              md={5}
              asChild
              name="specialty"
              value={filters.specialty}
              onChange={handleChangeFilter}
              label="Especialidade:"
            >
              <select>
                <option value="">Todas</option>
                {
                    specialties.map((specialty) => (
                      <option key={specialty} value={specialty} className=" appearance-none">{specialty}</option>
                    ))
                  }
              </select>

            </Input>
            <Input
              textCenter
              className=""
              md={5}
              asChild
              name="doctorId"
              value={filters.doctorId}
              onChange={handleChangeFilter}
              label="Médico:"
            >
              <select>
                <option value="">Todos</option>
                {
                    filteredDoctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId} className=" appearance-none">{doctor.employee.name}</option>
                    ))
                  }
              </select>
            </Input>

          </div>
        </div>
      </PanelSubHeader>
      <PanelSubHeader className="p-2">
        <AttendancesTable attendances={attendances} />

        <div className="fixed w-[210mm] left-[-100000px]">
          <div ref={printComponentRef}>
            <AttendancePrintTable
              attendances={[...attendances]}
              searchParams={{
                doctor: doctorName,
                specialty: filters.specialty || '',
                startDate: filters.attendanceStartDate || '',
                endDate: filters.attendanceEndDate || '',
              }}
            />

          </div>
        </div>

      </PanelSubHeader>
      <div className="w-full flex justify-end py-4">
        <Button className="mx-10" variant="small" onClick={handlePrint}>Imprimir</Button>
      </div>
    </Panel>
  );
}

export default Attendances;
