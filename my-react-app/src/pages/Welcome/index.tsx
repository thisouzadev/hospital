import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { ISector } from '@/types/backend.interfaces';

function Welcome() {
  const [state, dispatch] = useAppStore();

  const navigate = useNavigate();

  const { sectors } = state;

  const handleSectorClick = (sector: ISector) => {
    dispatch({ type: 'CHANGE_SECTOR', payload: sector });
    navigate('/atendimento');
  };

  return (
    <div className="m-auto w-full text-center pt-20 text-white text-2xl drop-shadow-md">
      <span>
        Bem Vindo ao sistema de gestão hospitalar
      </span>
      <div className="w-full flex pt-20 gap-4 justify-center">
        {sectors.map((sector) => (
          <button
            key={sector.sectorId}
            type="button"
            className="border-1 p-4 rounded-lg bg-[#D9D9D980] hover:bg-[#c5c5c580]"
            onClick={() => handleSectorClick(sector)}
          >
            {sector.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
