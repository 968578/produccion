import { useSelector } from "react-redux"

import './c-lotes-paro.css'

import Lote from "../c-lote/c-lote"


const LotesParo = () => {

  const lotes = useSelector(state => state.AllLotes)


  return (
    <div className="containerAllLotesParo" >
      <div className="c-titleParo">
        <h2>Paro</h2>
      </div>
      <div className="c-lotesParo">
        {
          lotes && lotes.map((e, i) =>
            e.estado === 'Paro' &&
            <Lote key={e.op} showLote={e} index={i} />
          )
        }
      </div>
    </div>
  )
}

export default LotesParo
