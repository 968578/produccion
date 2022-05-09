import { Routes, Route, Link } from "react-router-dom";

import './App.css';

import FormLotes from './pages/p-form-crear-lote/p-form-crear-lote';
import HomeAdmin from './pages/p-home-admin/p-home-admin'
import DetailsLoteAdmin from "./pages/p-details-lote-admin/p-details-lote-admin";
import HomeAuditoria from "./pages/p-home-auditoria/p-home-auditoria";
import DetailsLoteAuditoria from "./pages/p-details-lote-auditoria/p-details-lote-auditoria";
import HomeConfeccionista from "./pages/p-home-confeccionista/p-home-confeccionista";
import LadingPage from "./pages/p-lading-page/p-lading-page";
import DetailsConfeccionistaPage from "./pages/p-details-lote-confeccionista/p-details-lote-confeccionista";
import HomeCedi from "./pages/p-home-cedi/p-home-cedi";
import AdminConfi from "./pages/p-admin-confi/p-admin-confi";

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<LadingPage />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/details-admin/:op" element={<DetailsLoteAdmin />} />
        <Route path="/confi-admin" element={<AdminConfi />} />
        <Route path="/insert-lotes-admin" element={<FormLotes />} />
        <Route path="/home-auditoria" element={<HomeAuditoria />} />
        <Route path="/details-auditoria/:op" element={<DetailsLoteAuditoria />} />
        <Route path="/home-confeccionista" element={<HomeConfeccionista />} />
        <Route path="/details-confeccionista/:op" element={<DetailsConfeccionistaPage />} />
        <Route path="/home-cedi" element={<HomeCedi />} />

      </Routes>
    </div>
  );
}

export default App;
