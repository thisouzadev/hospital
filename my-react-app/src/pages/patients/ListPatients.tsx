
import { useEffect, useState } from "react";
import patientService from "../../service/patient.service";
import { Patient } from "types/backend.models";
import { Link } from "react-router-dom";


function ListPatients() {
 
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(()=>{
    const fetchData = async ()=>{
      const patientsData:Patient[] = await patientService.getAll()
      setPatients(patientsData)
    }
    fetchData()
  },[])

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-32">
        <div className="h-10 bg-[#D9D9D970] mb-2 flex justify-between items-center">
          <button className="h-full bg-white rounded-md px-12">LIsta de Pacientes</button>
        
        </div>
        <div className="shadow-md bg-[#D9D9D970] py-3">
            <table className="w-full text-sm  text-center border-separate border-spacing">
                <tbody className="border border-red-600">
                    {patients.map(patient => (
                      <tr key={patient.name} className="h-10 border-transparent border-2 group">
                        <td className="bg-white rounded-md text-center font-bold w-1/6 ">
                            {patient.cns}
                        </td>
                        <td className="bg-white rounded-md w-1/3">
                          {patient.name}
                        </td>
                        <td className="bg-white rounded-md w-1/5  ">
                          <input type="date" value={patient.birth}  disabled className="text-center bg-transparent"/>
                        </td>
                        <td className="bg-white rounded-md font-bold">
                          <Link to={`/admin/pacientes/detalhes/${patient.patientId}`}>
                            <button className="w-full">
                              Detalhar
                            </button>
                          </Link>
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
