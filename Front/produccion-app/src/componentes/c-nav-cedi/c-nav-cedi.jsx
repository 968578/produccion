import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { searchLoteName } from "../../redux/actions/actions"


const NavCedi = () => {

  const [inputOp, setInputOp] = useState('')

  const allLotes = useSelector(state => state.AllLotes)
  const dispatch = useDispatch()


  const changeInput = (e) => {
    setInputOp(e.target.value)
  }


  const searchOp = () => {
    dispatch(searchLoteName(allLotes, inputOp))
  }


  const closeSession = () => {
    window.localStorage.removeItem('accessTokenCedi')
    window.location.href = '/'
  }


  return (
    <div className='navigation'>

      <div className='HomeButton'>Home</div>
      <div className='containerBuscar' >
        <input type="text" placeholder='op' onChange={changeInput} />
        <div onClick={searchOp}>Buscar</div>
      </div>
      <div className='containerButtons'>
        <div className="closeSession closeSessionAuditoria" onClick={closeSession}>Cerrar Sesion</div>
      </div>
    </div>
  )
}

export default NavCedi
