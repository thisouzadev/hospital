import { Route, Routes } from 'react-router-dom';
// import NotFound from '../pages/notFound';
import Login from '../pages/login';

/**
 * List of routes available only for anonymous users
 */
const PublicRoutes = () => (
  <Routes>
    {/* <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} /> */}
    <Route path="*" element={<Login />} />
  </Routes>
);

export default PublicRoutes;
