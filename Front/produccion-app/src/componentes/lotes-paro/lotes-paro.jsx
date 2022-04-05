import { useSelector } from "react-redux"
import Lote from "../lote/lote"

const LotesParo=()=>{


  const lotes = useSelector(state => state.AllLotes)


  return (
    <div >
      <h2>Lotes en Paro</h2>
      <div className="containerAllLotes">
      {
        lotes && lotes.map(e=>
          e.estado ==='one' &&
          <Lote key={e.op} showLote={e} />
          )
      }
      </div>
    </div>
  )
}

export default LotesParo
