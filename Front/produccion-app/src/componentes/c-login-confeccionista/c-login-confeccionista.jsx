import { useEffect, useState } from 'react'

import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

import './c-login-confeccionista.css'


const variantsForm = {
  hidden: {
    y: -300
  },
  show: {
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    y: -300,
    transition: {
      duration: 0.5
    }
  }
}


const LoginConfeccionista = (props) => {

  const [input, setInput] = useState({
    nombre: '',
    password: ''
  })
  const [errorLoggeo, setErrorLoggeo] = useState('')

  const changeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitInput = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/confeccionistas/login`, input)
      .then(r => {
        if (r.data.msj === 'Contraseña correcta') {
          window.localStorage.setItem('accessTokenConfeccionista', r.data.token)
          window.localStorage.setItem('rol', r.data.rol)
          window.location.href = '/home-confeccionista'
        } else {
          setErrorLoggeo(r.data.msj)
        }
      })
  }


  useEffect(() => {
    if (!props.active) {
      setErrorLoggeo('')
    }
  }, [props.active])


  return (
    <div className='containerLogin' >
      <AnimatePresence>
        {
          props.active &&
          <motion.form initial='hidden' animate='show' exit='exit' key='loginConfeccionista' variants={variantsForm} onSubmit={submitInput}>

            <div className="c-loginConfeccionista">
              <label className='nombreLogin' >Nombre: </label>
              <input className='inputLogin' onChange={changeInput} name='nombre' type="text" />
              <label className='nombreLogin' >Contraseña: </label>
              <input className='inputLogin' onChange={changeInput} name='password' type="password" />
              <input type='submit' className='btn-loginConfeccionista' value='Ingresar' />
            </div>
          </motion.form>

        }
        {
          errorLoggeo !== '' && <div className='errorLogin'>{errorLoggeo}</div>
        }
      </AnimatePresence>
    </div>
  )
}

export default LoginConfeccionista