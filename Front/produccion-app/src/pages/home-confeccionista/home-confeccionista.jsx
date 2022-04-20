import { useState, useEffect } from "react"
import axios from "axios"


import LotesConfeccionista from "../../componentes/lotes-confeccionista/lotes-confeccionista"
import NavConfeccionista from "../../componentes/nav-confeccionista/nav-confeccionista"


const HomeConfeccionista=()=>{

  const [data, setData] = useState([])
  const [confeccionista, setConfeccionista] = useState('')


  const filterLotes=(op)=>{

    const token = window.localStorage.getItem('accessToken')
    axios.get('http://localhost:3000/lotes/nombre', {
    headers:{
      'authorization' : 'Barrer ' + token
    }
    })  
    .then( r => setData([...r.data.lotes.filter(e => e.op.includes(op))]))

  }

  useEffect(()=>{

    const token = window.localStorage.getItem('accessToken')
    axios.get('http://localhost:3000/lotes/nombre', {
    headers:{
      'authorization' : 'Barrer ' + token
    }
    })  
    .then( r => {
        // console.log(r.data)
        if(r.data === 'token invalido'){
          window.location.href='/login-confeccionista'
        }else if(r.data.msj === 'Autorizado'){

          setData(r.data.lotes)
          setConfeccionista(r.data.nombre)
        }
      })
  },[])




  return(
    <div>
      <h1>{confeccionista}</h1>
      <NavConfeccionista searchLote={filterLotes}/>
      <LotesConfeccionista lotes={data}/>
    </div>
  )
}

export default HomeConfeccionista
