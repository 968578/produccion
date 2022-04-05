import LotesNoAuditados from "../../componentes/lotes-noAuditados-auditoria/lotes-noAuditados-auditoria"
import LotesSiAuditados from "../../componentes/lotes-siAuditados-auditoria/lotes-siAuditados-auditoria"
import NavigationAuditoria from "../../componentes/navigation-auditoria/navigation-auditoria"



const HomeAuditoria =()=>{
  return (
    <div>
      <NavigationAuditoria/>
      <LotesNoAuditados/>
      <LotesSiAuditados/>
    </div>
  )
}

export default HomeAuditoria
