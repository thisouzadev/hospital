import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Management from "./pages/management";
import CreatePatient from "./pages/patients/CreatePatient";
import ListPatients from "./pages/patients/ListPatients";
import CreateSchedule from "./pages/schedules/CreateSchedule";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/admin/manage" element={<Management />} />
          <Route
            path="/admin/pacientes/cadastrar"
            element={<CreatePatient />}
          />
          <Route path="/admin/pacientes" element={<ListPatients />} />
          <Route path="/admin/agendamentos" element={<CreateSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/manage" element={<Management />} />
        <Route path="/admin/pacientes/cadastrar" element={<CreatePatient />} />
        <Route path="/admin/pacientes" element={<ListPatients />} />
        <Route path="/admin/agendamentos" element={<CreateSchedule />} />
      </Routes>
    </>
  );
};
export default App;
