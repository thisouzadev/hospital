import { Sector } from '@/types/backend.models';
import { useAppStore } from '../../store';

const SectorSelect = () => {
  const [state, dispatch] = useAppStore();
  const { currentSector, sectors } = state;

  const handleChangeSector = (e:any) => {
    const sectorId = e.target.value;
    const selectedSector = sectors.find((s) => s.sectorId === sectorId) as Sector;
    dispatch({ type: 'CHANGE_SECTOR', payload: selectedSector });
  };

  return (
    <div>
      <label htmlFor="section-selector" className="w-40 border-1 rounded-lg bg-[#D9D9D980] p-2">
        <div>Setor:</div>
        <select name="section-selector" value={currentSector?.sectorId} onChange={handleChangeSector} className="bg-transparent w-full">
          <option value="" hidden>
            {' '}
          </option>
          {sectors.map((sector) => (
            <option
              key={sector.sectorId}
              value={sector.sectorId}
            >
              {sector.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SectorSelect;
