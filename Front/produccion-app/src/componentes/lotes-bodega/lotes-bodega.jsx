import { useSelector } from "react-redux"
import Lote from "../lote/lote"

const LotesBodega=()=>{

  const lotes = useSelector(state => state.AllLotes)
  return(
    <div >
      <h2>Lotes en Bodega</h2>
      <div className="containerAllLotes">
      {
        lotes && lotes.map(e=>
          e.estado ==='two' &&
          <Lote key={e.op} showLote={e} />
          )
      }
      </div>
    </div>
  )
}

export default LotesBodega
