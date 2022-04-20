import { useSelector } from "react-redux"
import Lote from "../c-lote/c-lote"

const LotesBodega=()=>{

  const lotes = useSelector(state => state.AllLotes)
  return(
    <div >
      <h2>Lotes en Confeccion</h2>
      <div className="containerAllLotes">
      {
        lotes && lotes.map(e=>
          e.estado ==='Confeccion' &&
          <Lote key={e.op} showLote={e} />
          )
      }
      </div>
    </div>
  )
}

export default LotesBodega
