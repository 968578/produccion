import Navigation from "../../componentes/navigation/navigation"
import LotesDestacados from "../../componentes/lotes-destacados/lotes-destacados"
import LotesParo from "../../componentes/lotes-paro/lotes-paro"
import LotesBodega from "../../componentes/lotes-bodega/lotes-bodega"
import FormConfeccionista from "../../componentes/form-confeccionista/form-confeccionista"
import { useState } from "react"
import './home-admin.css'
import AllConfeccionistas from "../../componentes/all-confeccionistas/all-confeccionistas"

const HomeAdmin=()=>{
  const [activeAddConfe, setActiveAddConfe] = useState(false)

  const addConfeccionista = ()=>{
    setActiveAddConfe(!activeAddConfe)
  }
  return(
    <div>
        <Navigation activeAddConfe = {addConfeccionista} />
        <FormConfeccionista active ={activeAddConfe}/>
        <LotesDestacados/>
        <LotesParo/>
        <AllConfeccionistas/>
    </div>

  )
}

export default HomeAdmin
