import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import FormLotes from './componentes/form-lotes/form-lotes';
import HomeAdmin from './pages/home-admin/home-admin'
import DetailsLote from "./pages/details-lote/detail";
import HomeAuditoria from "./pages/home-auditoria/home-auditoria";
import DetailsLoteAuditoria from "./pages/details-lote-auditoria/details-lote-auditoria";
import LoginConfeccionista from "./pages/login-confeccionista/login-confeccionista";
import HomeConfeccionista from "./pages/home-confeccionista/home-confeccionista";
import LadingPage from "./pages/lading-page/lading-page";


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
        <Route path ="/:op" element={<DetailsLote/>} />

        
      </Routes>
    </div>
  );
}

export default App;
