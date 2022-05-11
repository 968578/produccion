import { useEffect, useState } from "react"

import axios from "axios"

import './c-lotes-inactivos.css'

import LoteInactivo from "../c-lote-inactivo/c-lote-inactivo"


const LotesInactivos=()=>{

  const [dataLocal, setDataLocal] = useState([])

  useEffect(()=>{
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/get-inactivos`,{
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
    .then( r => {
      setDataLocal(r.data)
    })
  },[])


  return(
    <div className="c-lotesActivos">
      <div className="c-titleInactivos">
        <h2>Lotes Inactivos</h2>
      </div>
      <div className="containerAllLotes">
        
          {
            dataLocal.length > 0 && dataLocal.map((e,i)=>
            <LoteInactivo key={i} showLote={e} />
            )
          }
        
      </div>
    </div>
  )
}


export default LotesInactivos
