import { UserRole } from '../../types/backend.enums';
import { useAppStore } from '../../store';

const RoleSelect = () => {
  const [state, dispatch] = useAppStore();
  const { currentUser } = state;

  const handleChangeSector = (e:any) => {
    const role = e.target.value;
    dispatch({ type: 'CHANGE_ROLE', payload: role });
  };

  return (

    <select name="section-selector" value={currentUser?.role} onChange={handleChangeSector} className="bg-transparent w-full">
      <option value="" hidden>
        {' '}
      </option>
      {Object.values(UserRole).map((role) => (
        <option
          key={role}
          value={role}
        >
          {role}
        </option>
      ))}
    </select>
  );
};

export default RoleSelect;
