import './navigation.css'
import { Link } from 'react-router-dom' 
import { useState } from 'react'

import {
  searchLoteName,
  onlyParos,
  onlyBodega,
  onlyConfeccion
  } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

const Navigation=()=>{

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

  const filterBodega=()=>{
    dispatch(onlyBodega(allLotes))
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

        <div className='buttonLink' >
          <Link to='/'>Agregar Confeccionista</Link>
        </div>

        <div onClick={filterParos}>Solo Paros</div>
        <div onClick={filterBodega}>En Bodega</div>
        <div onClick={filterConfeccion}>En Confeccion</div>
      </div>
    </div>
  )
}

export default Navigation
