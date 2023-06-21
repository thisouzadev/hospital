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
      <Header/>
      <Routes>
        <Route >
          <Route path="/admin/manage" element={<Management />} />
          <Route path="/admin/pacientes/cadastrar" element={<CreatePatient />} />
          <Route path="/admin/pacientes" element={<ListPatients />} />
          <Route path="/admin/agendamentos" element={<CreateSchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
