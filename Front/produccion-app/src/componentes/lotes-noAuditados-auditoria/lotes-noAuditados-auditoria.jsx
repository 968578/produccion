import { useEffect, useState } from "react"
import axios from 'axios'

import {
  loadAllLotes,
  loadShowLotes
  } from '../../redux/actions/actions'
import { useDispatch, useSelector } from "react-redux"


import LoteAuditoria from "../lote-auditoria/lote-auditoria"


const LotesNoAuditados=()=>{

  const lotes = useSelector(state => state.ShowLotes)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    axios.get('http://localhost:3000/get-lotes')
    .then(r =>{
      dispatch(loadAllLotes(r.data))
      dispatch(loadShowLotes(r.data))
    }  )
  },[])


  return(
    <div >
      <h2>No Auditados</h2>
      <div className="containerAllLotes">
      {
        lotes && lotes.map(e=>
          e.auditado == false &&
          <LoteAuditoria key={e.op} showLote={e} />
          )
      }
      </div>
    </div>
  )
}

export default LotesNoAuditados
