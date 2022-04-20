import './c-nav-admin.css'
import { Link } from 'react-router-dom' 
import { useState } from 'react'

import {
  searchLoteName,
  onlyParos,
  onlyPreparacion,
  onlyConfeccion
  } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

const NavAdmin=(props)=>{

  console.log(props)

  const [inputOp, setInputOp] = useState('')

  const allLotes =  useSelector(state => state.AllLotes)
  const dispatch = useDispatch()

  const changeInput =(e)=>{
    setInputOp(e.target.value)
  }

  const searchOp=()=>{
    dispatch(searchLoteName(allLotes, inputOp))
  }

  const filterParos =()=>{
    dispatch(onlyParos(allLotes))
  }

  const filterPreparacion=()=>{
    dispatch(onlyPreparacion(allLotes))
  }

  const filterConfeccion=()=>{
    dispatch(onlyConfeccion(allLotes))
  }

  

  return(
    <div className='navigation' >

      <div className='HomeButton'>Home</div>
      <div className='containerBuscar' >
        <input type="text" placeholder='op' onChange={changeInput} />
        <div onClick={searchOp}>Buscar</div>
      </div>

      <div className='containerButtons'>
        <div className='buttonLink'>
          <Link to='/insert-lotes'>Crear Un Lote</Link>
        </div>

        <div onClick={()=> props.activeAddConfe()} className='buttonLink' >
          Agregar Confeccionista
        </div>

        {/* <div onClick={filterParos}>Solo Paros</div> */}
        <div onClick={filterPreparacion}>En Preparacion</div>
        <div onClick={filterConfeccion}>En Confeccion</div>
      </div>
    </div>
  )
}

export default NavAdmin
