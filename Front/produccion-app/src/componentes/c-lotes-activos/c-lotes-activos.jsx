import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from 'axios'

import './c-lotes-activos.css'

import Lote from "../c-lote/c-lote"

import {
  loadAllLotes,
  loadShowLotes
} from '../../redux/actions/actions'


const LotesActivos = () => {

  const showLotes = useSelector(state => state.ShowLotes)
  const dispatch = useDispatch()


  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/get`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        dispatch(loadAllLotes(r.data))
        dispatch(loadShowLotes(r.data))
      })
  }, [])


  return (

    <div className="c-lotesActivos">
      <div className="c-titleActivos">
        <h2>Activos</h2>
      </div>
      <div className="containerAllLotes">
        {
          showLotes && showLotes.map((e, i) =>

            <Lote key={e.op} showLote={e} index={i} />
          )
        }
        <Lote showLotes={showLotes} />
      </div>
    </div>
  )
}

export default LotesActivos
