import { useEffect } from "react"

import axios from "axios"
import { useDispatch } from "react-redux"

import { loadAllLotes, loadShowLotes } from "../../redux/actions/actions"

import LotesNoAuditados from "../../componentes/c-lotes-noAuditados-auditoria/c-lotes-noAuditados-auditoria"
import LotesSiAuditados from "../../componentes/c-lotes-siAuditados-auditoria/c-lotes-siAuditados-auditoria"
import NavAuditoria from "../../componentes/c-nav-auditoria/c-nav-auditoria"


const HomeAuditoria = () => {

  const dispatch = useDispatch()

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
      <NavAuditoria />
      <LotesNoAuditados />
      <LotesSiAuditados />
    </div>
  )
}

export default HomeAuditoria
