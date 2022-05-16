import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

import './p-details-lote-auditoria.css'

import FormAuditoria from "../../componentes/c-form-auditoria/c-form-auditoria"
import ComponentDetailsLoteAuditoria from "../../componentes/c-details-lote-auditoria/c-details-lote-auditoria"


const DetailsLoteAuditoria = () => {

  const params = useParams()

  const [dataLocal, setDataLocal] = useState('')
  const [activeAudit, setActiveAudit] = useState(false)

  const activarAuditado = () => {
    setActiveAudit(!activeAudit)
  }


  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAuditoria')
    const op = { op: params.op }
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/op`, {
      params: op,
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setDataLocal(r.data)
      })
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenAuditoria')) {
      window.location.href = '/'
    }
  }, [])


  return (
    <div className="c-DetailsLoteAuditoria">
      <ComponentDetailsLoteAuditoria activeAuditEvent={activarAuditado} />
      <FormAuditoria data={dataLocal} active={activeAudit} closeAudit={activarAuditado} />

    </div>
  )
}

export default DetailsLoteAuditoria
