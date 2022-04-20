import axios from "axios"
import { useEffect, useState } from "react"

import LoteConfeccionista from "../lote-confeccionista/lote-confeccionista"

import './lotes-confeccionista.css'


const LotesConfeccionista=(props)=>{



  console.log(props)
  return(
    <div className="c-lotesConfeccionista">
      {
        props?.lotes.length > 0 && props.lotes.map((e,i)=>
        
        <LoteConfeccionista key={i} data={e} />
        )
      }
    </div>
  )
}

export default LotesConfeccionista