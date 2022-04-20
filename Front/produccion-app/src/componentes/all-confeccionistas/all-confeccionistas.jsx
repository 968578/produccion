import axios from "axios";
import { useEffect, useState } from "react";
import Confeccionista from "../confeccionista/confeccionista";
import './all-confeccionistas.css'

const AllConfeccionistas=()=>{

  const [confeccionistas, setConfeccionistas] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/confeccionistas/get')
    .then(r => {
      setConfeccionistas(r.data)
    })
  },[])

  return(
    <div>
      <h1>Confeccionistas</h1>
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