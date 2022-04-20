import { useEffect, useState } from "react"
import axios from 'axios'

import {
  loadAllLotes,
  loadShowLotes
  } from '../../redux/actions/actions'
import { useDispatch, useSelector } from "react-redux"


import LoteAuditoria from "../c-lote-auditoria/c-lote-auditoria"


const LotesSiAuditados=()=>{

  const lotes = useSelector(state => state.ShowLotes)


  return(
    <div >
      <h2>Si Auditados</h2>
      <div className="containerAllLotes">
      {
        lotes && lotes.map(e=>
          e.auditado == true &&
          <LoteAuditoria key={e.op} showLote={e} />
          )
      }
      </div>
    </div>
  )
}

export default LotesSiAuditados
