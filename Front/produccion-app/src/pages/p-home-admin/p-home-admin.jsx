import { useState, useEffect } from "react"

import './p-home-admin.css'

import NavAdmin from "../../componentes/c-nav-admin/c-nav-admin"
import LotesActivos from "../../componentes/c-lotes-activos/c-lotes-activos"
import LotesParo from "../../componentes/c-lotes-paro/c-lotes-paro"
import FormConfeccionista from "../../componentes/c-form-confeccionista/c-form-confeccionista"


const HomeAdmin = () => {
  console.log(process.env)
  const [activeAddConfe, setActiveAddConfe] = useState(false)

  const addConfeccionista = () => {
    setActiveAddConfe(!activeAddConfe)
  }

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenAdmin')) {
      window.location.href = '/'
    }
  }, [])



  return (
    <div className="c-home-admin">
      <NavAdmin activeAddConfe={addConfeccionista} />
      <FormConfeccionista active={activeAddConfe} />
      <LotesActivos />
      <LotesParo />
    </div>
  )
}

export default HomeAdmin
