import NavAdmin from "../../componentes/c-nav-admin/c-nav-admin"
import LotesActivos from "../../componentes/c-lotes-activos/c-lotes-activos"
import LotesParo from "../../componentes/c-lotes-paro/c-lotes-paro"
import FormConfeccionista from "../../componentes/c-form-confeccionista/c-form-confeccionista"
import { useState } from "react"
import './p-home-admin.css'
import AllConfeccionistas from "../../componentes/c-all-confeccionistas/c-all-confeccionistas"

const HomeAdmin=()=>{
  const [activeAddConfe, setActiveAddConfe] = useState(false)

  const addConfeccionista = ()=>{
    setActiveAddConfe(!activeAddConfe)
  }
  return(
    <div>
        <NavAdmin activeAddConfe = {addConfeccionista} />
        <FormConfeccionista active ={activeAddConfe}/>
        <LotesActivos/>
        <LotesParo/>
        <AllConfeccionistas/>
    </div>

  )
}

export default HomeAdmin
