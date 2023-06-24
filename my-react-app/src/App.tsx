import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Management from "./pages/management";
import ListPatients from "./pages/patients/ListPatients";
import ListAttendances from "./pages/attendances/ListAttendances";
import Header from "./components/Header";
import CreateEmployee from "./pages/management/CreateEmployee";
import UpdatePatient from "./pages/patients/UpdatePatient";
import CreatePatient from "./pages/patients/CreatePatient";
import CreateAttendance from "./pages/attendances/CreateAttendance";

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
          <Route path="/admin/manage/cadastrar" element={<CreateEmployee />} />
          <Route path="/admin/pacientes/detalhes/:patientId" element={<UpdatePatient />} />
          <Route path="/admin/pacientes" element={<ListPatients />} />
          <Route path="/admin/agendamentos" element={<ListAttendances />} />
          <Route path="/admin/agendamentos/novo" element={<CreateAttendance />} />

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
        <Route path="/admin/pacientes/detalhes/:patientId" element={<UpdatePatient />} />
        <Route path="/admin/pacientes" element={<ListPatients />} />
        <Route path="/admin/agendamentos" element={<ListAttendances />} />
        <Route path="/admin/agendamentos/novo" element={<CreateAttendance />} />
        <Route path="/admin/manage/cadastrar" element={<CreateEmployee />} />
      </Routes>
    </>
  );
};
export default App;
