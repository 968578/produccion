
import { useState } from "react"



const NavConfeccionista = (props) => {


  const [inputOp, setInputOp] = useState('')


  const changeInput =(e)=>{
    setInputOp(e.target.value)
  }

  const searchOp=()=>{
    // console.log(inputOp)
    props.searchLote(inputOp)
  }

  const closeSession=(e)=>{
    e.preventDefault()
    window.localStorage.removeItem('accessToken')
    window.location.href='/login-confeccionista'
  }


  return (
    <div className='navigation' >

      <div className='containerBuscar' >
        <input type="text" placeholder='op' onChange={changeInput} />
        <div onClick={searchOp}>Buscar</div>
      </div>
      <button onClick={closeSession}>Cerrar sesion</button>

    </div>
  )
}

export default NavConfeccionista
