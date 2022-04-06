import { useEffect, useState } from "react"
import axios from 'axios'

import {
  loadAllLotes,
  loadShowLotes
  } from '../../redux/actions/actions'
import { useDispatch, useSelector } from "react-redux"

import './lotes-destacados.css'

import Lote from "../lote/lote"


const LotesDestacados=()=>{

  const showLotes = useSelector(state => state.ShowLotes)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    axios.get('http://localhost:3000/lotes/get')
    .then(r =>{
      dispatch(loadAllLotes(r.data))
      dispatch(loadShowLotes(r.data))
    }  )
  },[])

  return (
    
    <div >
      <h2>Lotes Activos</h2>
      <div className="containerAllLotes">
        {
          showLotes && showLotes.map(e =>
            <Lote key={e.op} showLote={e} />
            )
        }
      <Lote showLotes ={showLotes} />
      </div>
    </div>
  )
}

export default LotesDestacados