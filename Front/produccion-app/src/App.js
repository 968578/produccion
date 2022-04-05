import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import FormLotes from './componentes/form-lotes/form-lotes';
import FormAuditoria from './componentes/form-auditoria/form-auditoria'
import Home from './pages/home/home'
import DetailsLote from "./pages/details-lote/detail";
import HomeAuditoria from "./pages/home-auditoria/home-auditoria";
import DetailsLoteAuditoria from "./pages/details-lote-auditoria/details-lote-auditoria";


function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/insert-lotes" element={<FormLotes/>}/>
        <Route path ="/:op" element={<DetailsLote/>} />
        <Route path="/Home-Auditoria" element={<HomeAuditoria/>}/>
        <Route path="/Details-Auditoria/:op" element={<DetailsLoteAuditoria/>}/>
        

        
      </Routes>
    </div>
  );
}

export default App;
