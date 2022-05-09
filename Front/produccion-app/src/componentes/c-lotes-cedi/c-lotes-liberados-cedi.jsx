import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import axios from "axios"

import './c-lotes-terminados-cedi.css'

import LoteCedi from "../c-lote-cedi/c-lote-cedi"

import {
  loadAllLotes,
  loadShowLotes,
} from "../../redux/actions/actions"


const LotesCedi = () => {

  const showLotes = useSelector(state => state.ShowLotes)
  const dispatch = useDispatch()


  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenCedi')
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
      <div className="titleLotesLiberados">
        <h2 >Lotes Liberados</h2>
      </div>
      <div className="containerAllLotes">
        {
          showLotes && showLotes.map((e, i) =>
            e.estado === 'Liberado' &&
            <LoteCedi key={i} showLote={e} index={i} />
          )
        }
      </div>
    </div>
  )
}

export default LotesCedi
