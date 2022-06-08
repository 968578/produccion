import { useState } from 'react'

import { Link } from 'react-router-dom'

import { utils, writeFile } from 'xlsx/xlsx.mjs';
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'

import './c-nav-admin.css'

import {
  searchLoteName,
  onlyPreparacion,
  onlyConfeccion
} from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'


const NavAdmin = (props) => {

  const [inputOp, setInputOp] = useState('')

  const allLotes = useSelector(state => state.AllLotes)
  const dispatch = useDispatch()

  const changeInput = (e) => {
    setInputOp(e.target.value)
  }


  const searchOp = () => {
    dispatch(searchLoteName(allLotes, inputOp))
  }


  const filterPreparacion = () => {
    dispatch(onlyPreparacion(allLotes))
  }


  const filterConfeccion = () => {
    dispatch(onlyConfeccion(allLotes))
  }


  const closeSession = () => {
    window.localStorage.removeItem('accessTokenAdmin')
    window.location.href = '/'
  }


  const openBookings = () => {
    window.open('https://outlook.office365.com/owa/calendar/ENTREGASPTKARIBIK@kbk.co/bookings/')
  }

  const exportExcelLotes = (e) => {

    e.preventDefault()
    
      const token = window.localStorage.getItem('accessTokenAdmin')
      axios.get(`${process.env.REACT_APP_API_URL}/lotes/get-export`, {
        headers: {
          'authorization': 'Barrer ' + token
        }
      })
        .then(r => {
          if (r.data.length > 0) {
            
            for(let i = 0; i < r.data.length; i++){
                r.data[i].ciclo_Recepcion = 0
                r.data[i].ciclo_Preparacion = 0
                r.data[i].ciclo_Confeccion = 0
                r.data[i].ciclo_Lavanderia = 0
                r.data[i].ciclo_Terminacion = 0
                for(let j =0 ; j < r.data[i].ciclo.length; j++){
                  
                  r.data[i][`ciclo_${r.data[i].ciclo[j].tipo}`] = differenceInCalendarDays((r.data[i].ciclo[j].fecha_final !== null ?
                    new Date(r.data[i].ciclo[j].fecha_final).setMinutes(300) : Date.now()), 
                    new Date(r.data[i].ciclo[j].fecha_inicio).setMinutes(300) )
                }
                delete r.data[i].ciclo
              
            }
              const wb = utils.book_new()
              const ws = utils.json_to_sheet(r.data)
              utils.book_append_sheet(wb, ws, 'TablaPrincipal')
              writeFile(wb, 'Lotes-totales.xlsx')

            
          }
        })

  }


  return (
    <div className='navigation' >
      <div className='nav-left'>
        <div className='HomeButton'>Home</div>
        <div className='containerBuscar' >
          <input type="text" placeholder='op' onChange={changeInput} />
          <div onClick={searchOp}>Buscar</div>
        </div>
      </div>

      <div className='nav-rigth'>
        <div className='containerButtons'>
          <div className='buttonLink'>
            <Link to='/insert-lotes-admin'>Crear Un Lote</Link>
          </div>

          <div onClick={() => props.activeAddConfe()} className='buttonLink' >
            Agregar Confeccionista
          </div>
          <div onClick={filterPreparacion}>En Preparacion</div>
          <div onClick={filterConfeccion}>En Confeccion</div>
          <div className='buttonLink' >
            <Link to='/confi-admin'>Configuracion</Link>
          </div>
          <div onClick={exportExcelLotes} className='b-exportExcel' >Exportar Excel</div>
          <div className='closeSession b-bookings' onClick={openBookings}>Bookings</div>
          <div className='closeSession' onClick={closeSession}>Cerrar Sesion</div>
        </div>
      </div>
    </div>
  )
}

export default NavAdmin
