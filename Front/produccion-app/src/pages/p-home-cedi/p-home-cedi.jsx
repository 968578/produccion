import { useEffect } from "react"

import NavCedi from "../../componentes/c-nav-cedi/c-nav-cedi"
import LotesCedi from "../../componentes/c-lotes-cedi/c-lotes-liberados-cedi"
import LotesProximosCedi from "../../componentes/c-lotes-proximos-cedi/c-lotes-proximos-cedi"


const HomeCedi = () => {

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenCedi')) {
      window.location.href = '/'
    }
  })


  return (
    <div>
      <NavCedi />
      <LotesCedi />
      <LotesProximosCedi />
    </div>
  )
}

export default HomeCedi
