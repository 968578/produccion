import Navigation from "../../componentes/navigation/navigation"
import LotesDestacados from "../../componentes/lotes-destacados/lotes-destacados"
import LotesParo from "../../componentes/lotes-paro/lotes-paro"
import LotesBodega from "../../componentes/lotes-bodega/lotes-bodega"

const Home=()=>{
  return(
    <div>
      <Navigation/>
      <LotesDestacados/>
      <LotesParo/>
      <LotesBodega/>
    </div>
  )
}

export default Home
