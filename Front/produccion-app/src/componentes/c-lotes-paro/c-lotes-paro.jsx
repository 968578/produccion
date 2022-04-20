import { useSelector } from "react-redux"
import Lote from "../c-lote/c-lote"

const LotesParo=()=>{


  const lotes = useSelector(state => state.AllLotes)


  return (
    <div >
      <h2>Lotes en Paro</h2>
      <div className="containerAllLotes">
      {
        lotes && lotes.map(e=>
          e.estado ==='Paro' &&
          <Lote key={e.op} showLote={e} />
          )
      }
      </div>
    </div>
  )
}

export default LotesParo
