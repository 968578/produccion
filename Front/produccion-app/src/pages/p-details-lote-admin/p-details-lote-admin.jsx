
import EditarLote from "../../componentes/c-form-editar-lote/c-form-editar-lote";
import DetailsLote from "../../componentes/c-details-lote-admin/c-details-lote-admin";
import "./p-details-lote-admin.css";
import { useEffect, useState } from "react";




const DetailsLoteAdmin = () => {
  
  const [activeEdit, setActiveEdit] = useState(false);

  const editLote = () => {
    setActiveEdit(!activeEdit);
  };

  useEffect(()=>{
    if(!window.localStorage.getItem('accessTokenAdmin')){
      window.location.href='/'
    }
  },[])

  return (
    <div className="c-detailsAdmin">
      <DetailsLote activeEditEvent={editLote} />
      <EditarLote  active={activeEdit} closeEdit={editLote} />
    </div>
  );
};

export default DetailsLoteAdmin;
