import { useSelector } from "react-redux"

import './c-lotes-noAuditados-auditoria.css'

import LoteAuditoria from "../c-lote-auditoria/c-lote-auditoria"


const LotesNoAuditados = () => {

  const lotes = useSelector(state => state.ShowLotes)


  return (
    <div className="c-lotesActivos">
      <div className="c-titleNoAuditdos">
        <h2>No Auditados</h2>
      </div>
      <div className="containerAllLotes">
        {
          lotes && lotes.map((e, i) =>
            e.auditado == false &&
            <LoteAuditoria key={e.op} showLote={e} index={i} />
          )
        }
      </div>
    </div>
  )
}

export default LotesNoAuditados
