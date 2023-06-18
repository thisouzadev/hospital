import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Management from "./pages/management";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/admin/manage" element={<Management />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
