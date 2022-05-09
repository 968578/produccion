import { useSelector } from "react-redux"

import LoteAuditoria from "../c-lote-auditoria/c-lote-auditoria"


const LotesSiAuditados = () => {

  const lotes = useSelector(state => state.ShowLotes)


  return (
    <div className="c-lotesActivos" >
      <div className="c-titleSiAuditdos">
        <h2>Si Auditados</h2>

      </div>
      <div className="containerAllLotes">
        {
          lotes && lotes.map((e, i) =>
            e.auditado == true &&
            <LoteAuditoria key={e.op} showLote={e} index={i} />
          )
        }
      </div>
    </div>
  )
}

export default LotesSiAuditados
