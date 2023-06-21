
import { useEffect, useState } from "react";
import patientService from "../../service/patient.service";
import Header from "./Header";
import scheduleService from "../../service/schedule.service";

interface IPatient {name:string, createdAd: Date}

function ListPatients() {
 
  const [patients, setPatients] = useState<IPatient[]>([])

  const [schedules, setSchedules] = useState<any[]>([])


  useEffect(()=>{
    const fetchData = async ()=>{
      const patientsData:IPatient[] = await patientService.getAll()
      setPatients(patientsData)
      const schedulesData = await scheduleService.getAll()
      setSchedules(schedulesData)
      console.log(schedulesData)
    }
    fetchData()
  },[])

  return (
    <div className="w-full">
      <Header></Header>
      <div className="max-w-5xl m-auto pt-32">
        <div className="h-10 bg-[#D9D9D970] mb-2 flex justify-between items-center">
          <button className="h-full bg-white rounded-md px-12">Últimas 5 entradas / Adulto</button>
          <button className="h-full bg-white rounded-md px-12">Exibir todas / Adulto</button>
        </div>
        <div className="shadow-md bg-[#D9D9D970] py-3">
            <table className="w-full text-sm  text-center border-separate border-spacing">
                <tbody className="border border-red-600">
                    {patients.map(patient => (
                      <tr key={patient.name} className="h-10 border-transparent border-2">
                        <td className="bg-white rounded-md text-center font-bold">
                            ID de entrada
                        </td>
                        <td className="bg-white rounded-md">
                            Número do BAM
                        </td>
                        <td className="bg-white rounded-md w-1/3">
                            {patient.name}
                        </td>
                        <td className="bg-white rounded-md">
                            Especialidade
                        </td>
                        <td className="bg-white rounded-md font-bold">
                            Detalhar
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="max-w-5xl m-auto pt-10">
        <div className="h-10 bg-[#D9D9D970] mb-2 flex justify-between items-center">
          <button className="h-full bg-white rounded-md px-12">Últimos 5 agendamentos</button>
          <button className="h-full bg-white rounded-md px-12">Exibir todos</button>
        </div>
        <div className="shadow-md bg-[#D9D9D970] py-3">
            <table className="w-full text-sm  text-center border-separate border-spacing">
                <tbody className="border border-red-600">
                    {schedules.map(schedule => (
                      <tr key={schedule.scheduleId} className="h-10 border-transparent border-2">
                        <td className="bg-white rounded-md text-center font-bold">
                            <input type="date" value={schedule.scheduleDate} disabled/>
                        </td>
                        <td className="bg-white rounded-md">
                            {schedule.patient.name}
                        </td>
                        <td className="bg-white rounded-md w-1/3">
                          {schedule.doctor ? 
                            `Dr(a): ${schedule.doctor?.employee?.name}` :
                            ''
                          }
                        </td>
                        <td className="bg-white rounded-md font-bold">
                            Detalhar
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default ListPatients;
