import { useState } from 'react'

import { Link } from 'react-router-dom'

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


  return (
    <div className='navigation' >

      <div className='HomeButton'>Home</div>
      <div className='containerBuscar' >
        <input type="text" placeholder='op' onChange={changeInput} />
        <div onClick={searchOp}>Buscar</div>
      </div>

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
        <div className='closeSession' onClick={closeSession}>Cerrar Sesion</div>
        <div className='closeSession b-bookings' onClick={openBookings}>Bookings</div>
      </div>
    </div>
  )
}

export default NavAdmin
