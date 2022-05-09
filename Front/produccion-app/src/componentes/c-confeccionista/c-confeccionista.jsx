import { useState } from 'react'

import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'

import './c-confeccionista.css'


const variantsConfirmDelete = {
  hidden: {
    scale: 0,
    transition: {
      duration: 0.5
    }
  },
  show: {
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}


const Confeccionista = (props) => {

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmationDelete, setConfirmationDelete] = useState('')

  const deleteConfeccionista = () => {
    const token = window.localStorage.getItem('accessTokenAdmin')
    const nombre = {
      nombre: props.data.nombre
    }
    axios.delete(`${process.env.REACT_APP_API_URL}/confeccionistas/delete`, {
      params: nombre,
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setConfirmationDelete(r.data.msj)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })

  }


  return (
    <div>
      
      <div  className='confeccionista'>
        <div>
          {
            props.data &&
            <div className='c-data-confe' >
              <div>
                <div className='nameConfeccionista'>{props.data.nombre}</div>
              </div>
              <div onClick={() => setConfirmDelete(!confirmDelete)} className='c-deleteConrfeccionista'>
                <div  className='X-confeccionista'>
                </div>
              </div>
            </div>

          }

        </div>
        <AnimatePresence>
          {
            confirmDelete &&
            <motion.div className='confirmDeleteConfe' exit='hidden' animate='show' initial='hidden' variants={variantsConfirmDelete}>
              <div>¿Eliminar?</div>
              <button onClick={deleteConfeccionista} >Aceptar</button>
              <button onClick={() => setConfirmDelete(!confirmDelete)}>Cancelar</button>
            </motion.div>
          }
        </AnimatePresence>
        {
          confirmationDelete !== '' && <motion.div className='confirmationDeleteConfe' exit='hidden' animate='show' initial='hidden' variants={variantsConfirmDelete}>{confirmationDelete}</motion.div>
        }
      </div>

    </div>
  )
}

export default Confeccionista
