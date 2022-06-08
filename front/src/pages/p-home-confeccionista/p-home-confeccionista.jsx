import { useState, useEffect } from "react"

import axios from "axios"

import './p-home-confeccionista.css'

import LotesConfeccionista from "../../componentes/c-lotes-confeccionista/c-lotes-confeccionista"
import NavConfeccionista from "../../componentes/c-nav-confeccionista/c-nav-confeccionista"
import GraficoGeneralConfeccionista from "../../componentes/c-grafico-general-confeccionista/c-grafico-general-confeccionista"


const HomeConfeccionista = () => {

  const [data, setData] = useState([])
  const [confeccionista, setConfeccionista] = useState('')

  const filterLotes = (op) => {
    const token = window.localStorage.getItem('accessTokenConfeccionista')
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/nombre`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        console.log(r.data)
        setData([...r.data.lotes.filter(e => e.op.includes(op))])
      })

  }

  useEffect(() => {

    const token = window.localStorage.getItem('accessTokenConfeccionista')
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/nombre`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        if (r.data.msj === 'Autorizado') {
          setData(r.data.lotes)
          setConfeccionista(r.data.nombre)
        }
      })
  }, [])

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenConfeccionista')) {
      window.location.href = '/'
    }
  }, [])


  return (
    <div>
      <NavConfeccionista searchLote={filterLotes} />
      <h1 className="titleNombreConfe">{confeccionista}</h1>
      <GraficoGeneralConfeccionista lotes = {data}/>
      <LotesConfeccionista lotes={data} />
    </div>
  )
}

export default HomeConfeccionista
