import { useEffect, useState } from "react"

import axios from "axios"
import { useDispatch } from "react-redux"

import { loadAllLotes, loadShowLotes } from "../../redux/actions/actions"

import LotesNoAuditados from "../../componentes/c-lotes-noAuditados-auditoria/c-lotes-noAuditados-auditoria"
import LotesSiAuditados from "../../componentes/c-lotes-siAuditados-auditoria/c-lotes-siAuditados-auditoria"
import NavAuditoria from "../../componentes/c-nav-auditoria/c-nav-auditoria"
import ExportAuditorias from "../../componentes/c-export-auditorias-xlsx/c-export-auditorias-xlsx"


const HomeAuditoria = () => {

  const dispatch = useDispatch()

  const [activeExport, setActiveExport] = useState(false)

  const activeExporting = ()=>{
    setActiveExport(!activeExport)
  }

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenAuditoria')) {
      window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAuditoria')
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/get`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        dispatch(loadAllLotes(r.data))
        dispatch(loadShowLotes(r.data))
      })
  }, [])




  return (
    <div>
      <NavAuditoria activarExport={activeExporting} />
      <ExportAuditorias active={activeExport}/>
      <LotesNoAuditados />
      <LotesSiAuditados />
    </div>
  )
}

export default HomeAuditoria
