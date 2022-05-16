import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

import './p-details-lote-confeccionista.css'

import DetailsLoteConfeccionista from "../../componentes/c-details-lote-confeccionista/c-details-lote-confeccionista"
import EditarLoteConfeccionista from "../../componentes/c-form-editar-lote-confeccionista/c-form-editar-lote-confeccionista"
import FormAuditoriaConfeccionista from "../../componentes/c-form-auditaria-confeccionista/c-form-auditaria-confeccionista"


const DetailsConfeccionistaPage = () => {

  const params = useParams()

  const [dataLocal, setDataLocal] = useState('')
  const [activeEdit, setActiveEdit] = useState(false)
  const [activeAudit, setActiveAudit] = useState(false)
  const [noAutorizado, setNoAutorizado] = useState('')

  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenConfeccionista')
    const op = { op: params.op }
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/op-from-confeccionista`, {
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
    if (!window.localStorage.getItem('accessTokenConfeccionista')) {
      window.location.href = '/'
    }
  }, [])


  const activarEdicion = () => {
    if (activeAudit) {
      setActiveEdit(!activeEdit)
      setActiveAudit(false)
    } else {
      setActiveEdit(!activeEdit)
    }
  }


  const activarAuditado = () => {
    if (window.localStorage.getItem('rol').includes('Auditor')) {
      if (activeEdit) {
        setActiveAudit(!activeAudit)
        setActiveEdit(false)
      } else {
        setActiveAudit(!activeAudit)
      }
    } else {
      setActiveEdit(false)
      setNoAutorizado('No Estas Autorizado Para Auditar')
      setTimeout(() => {
        setNoAutorizado('')
      }, 4000)
    }
  }


  return (
    <div>
      <DetailsLoteConfeccionista activeEditEvent={activarEdicion} activeAuditEvent={activarAuditado} />
      <EditarLoteConfeccionista active={activeEdit} data={dataLocal} />
      <FormAuditoriaConfeccionista data={dataLocal} active={activeAudit} activeEvent={activarAuditado} />
      {
        noAutorizado !== '' && <p className="NoautorizadoAudit">{noAutorizado}</p>
      }

    </div>
  )
}

export default DetailsConfeccionistaPage
