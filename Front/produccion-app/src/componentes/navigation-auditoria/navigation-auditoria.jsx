import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import {
  searchLoteName,
} from '../../redux/actions/actions'


const NavigationAuditoria = () => {

  const allLotes = useSelector(state => state.AllLotes)

  const [inputOp, setInputOp] = useState('')

  const dispatch = useDispatch()

  const changeInput =(e)=>{
    setInputOp(e.target.value)
  }

  const searchOp=()=>{
    dispatch(searchLoteName(allLotes, inputOp))
  }


  return (
    <div className='navigation' >

      <div className='HomeButton'>Home</div>
      <div className='containerBuscar' >
        <input type="text" placeholder='op' onChange={changeInput} />
        <div onClick={searchOp}>Buscar</div>
      </div>

    </div>
  )
}

export default NavigationAuditoria