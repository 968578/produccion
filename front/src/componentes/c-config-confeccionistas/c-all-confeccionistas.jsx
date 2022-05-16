import { useEffect, useState } from "react";

import axios from "axios";

import './c-all-confeccionistas.css'

import Confeccionista from "../c-confeccionista/c-confeccionista";


const AllConfeccionistas=()=>{

  const [confeccionistas, setConfeccionistas] = useState([])

  useEffect(()=>{
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.get(`${process.env.REACT_APP_API_URL}/confeccionistas/get`, {
      headers:{
        'authorization' : 'Barrer ' + token
      }
    })
    .then(r=> {
      setConfeccionistas(r.data.results)
    })
  },[])

  
  return(
    <div>
      <h1 className="titleConfigConfeccionista">Confeccionistas</h1>
      <div className="c-confeccionistas">
        {
          confeccionistas.length > 0 && confeccionistas.map((e,i)=>
          <Confeccionista key={i} data = {e}/>
          )
        }
      </div>
    </div>
  )

}

export default AllConfeccionistas
