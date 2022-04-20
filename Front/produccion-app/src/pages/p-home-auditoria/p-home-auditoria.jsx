import LotesNoAuditados from "../../componentes/c-lotes-noAuditados-auditoria/c-lotes-noAuditados-auditoria"
import LotesSiAuditados from "../../componentes/c-lotes-siAuditados-auditoria/c-lotes-siAuditados-auditoria"
import NavAuditoria from "../../componentes/c-nav-auditoria/c-nav-auditoria"



const HomeAuditoria =()=>{
  return (
    <div>
      <NavAuditoria/>
      <LotesNoAuditados/>
      <LotesSiAuditados/>
    </div>
  )
}

export default HomeAuditoria
