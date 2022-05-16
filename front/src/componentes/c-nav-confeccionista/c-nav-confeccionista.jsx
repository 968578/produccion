import { useState } from "react"

import './c-nav-confeccionista.css'


const NavConfeccionista = (props) => {

  const [inputOp, setInputOp] = useState('')


  const changeInput = (e) => {
    setInputOp(e.target.value)
  }


  const searchOp = () => {
    props.searchLote(inputOp)
  }


  const closeSession = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('accessTokenConfeccionista')
    window.localStorage.removeItem('rol')
    window.location.href = '/'
  }


  return (
    <div className='navigation' >

      <div className='containerBuscar' >
        <input type="text" placeholder='op' onChange={changeInput} />
        <div onClick={searchOp}>Buscar</div>
      </div>
      <div className='containerButtons'>
        <div className="closeSessionConfe" onClick={closeSession}>Cerrar sesion</div>
      </div>

    </div>
  )
}

export default NavConfeccionista
