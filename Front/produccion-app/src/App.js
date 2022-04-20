import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import FormLotes from './pages/p-form-crear-lote/p-form-crear-lote';
import HomeAdmin from './pages/p-home-admin/p-home-admin'
import DetailsLote from "./pages/p-details-lote-admin/p-details-lote-admin";
import HomeAuditoria from "./pages/p-home-auditoria/p-home-auditoria";
import DetailsLoteAuditoria from "./pages/p-details-lote-auditoria/p-details-lote-auditoria";
import LoginConfeccionista from "./pages/p-login-confeccionista/p-login-confeccionista";
import HomeConfeccionista from "./pages/p-home-confeccionista/p-home-confeccionista";
import LadingPage from "./pages/p-lading-page/p-lading-page";
import DetailsConfeccionistaPage from "./pages/p-details-lote-confeccionista/p-details-lote-confeccionista-page";


function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<LadingPage/>}/> 
        <Route path="/home-admin" element={<HomeAdmin/>}/>
        <Route path="/insert-lotes" element={<FormLotes/>}/>
        <Route path="/home-auditoria" element={<HomeAuditoria/>}/>
        <Route path="/details-auditoria/:op" element={<DetailsLoteAuditoria/>}/>
        <Route path="/login-confeccionista" element={<LoginConfeccionista/>}/>
        <Route path="/home-confeccionista" element={<HomeConfeccionista/>} />
        <Route path="/details-confeccionista/:op" element={<DetailsConfeccionistaPage/>}/>
        <Route path ="/:op" element={<DetailsLote/>} />

        
      </Routes>
    </div>
  );
}

export default App;
