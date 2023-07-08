import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="m-auto w-full text-center pt-20 text-white text-2xl drop-shadow-md">
      <span>
        Bem Vindo ao sistema de gestão hospitalar
      </span>
      <div className="w-full flex pt-20 gap-4">
        <Link to="/enfermaria">
          <div className="border-1 p-4 rounded-lg bg-[#D9D9D980]">
            Enfermaria
          </div>
        </Link>
        <Link to="/ambulatorio">
          <div className="border-1 p-4 rounded-lg bg-[#D9D9D980]">
            Ambulatório
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
