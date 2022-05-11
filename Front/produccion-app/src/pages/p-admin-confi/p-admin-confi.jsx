import { useEffect } from "react"

import { Link } from "react-router-dom"

import AllConfeccionistas from "../../componentes/c-config-confeccionistas/c-all-confeccionistas"
import LotesInactivos from "../../componentes/c-lotes-inactivos/c-lotes-inactivos"


const AdminConfi = () => {

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenAdmin')) {
      window.location.href = '/'
    }
  }, [])


  return (
    <div>
      <div className="containerHomeButton">
        <Link to="/home-admin" className="HomeFormLote">
          Home
        </Link>
      </div>
      <AllConfeccionistas />
      <LotesInactivos />
    </div>
  )
}

export default AdminConfi
