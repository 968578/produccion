import axios from 'axios'
import { useState } from 'react'
import './confeccionista.css'

const Confeccionista=(props)=>{

  const [confirmDelete, setConfirmDelete]=useState(false)

  // console.log(props.data.nombre)

  const deleteConfeccionista=()=>{
    axios.delete()

  }

  const modalConfirmDelete=()=>{

  }

  return(
    <div className='confeccionista'>
      <div>
        {
          props.data &&
          <div  className='c-data-confe' >
            <div>
              <div>{props.data.nombre}</div>
            </div>
            <div onClick={()=>setConfirmDelete(!confirmDelete)} className='X-confeccionista'>

            </div>
          </div>

        }

      </div>
      {
          confirmDelete &&
          <div>
            <div>Eliminar?</div>
            <button>Aceptar</button>
            <button>Cancelar</button>
          </div>
        }
    </div>
  )
}

export default Confeccionista