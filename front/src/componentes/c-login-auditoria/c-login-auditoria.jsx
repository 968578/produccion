import { useEffect, useState } from 'react'

import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'


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


const LoginAuditoria = (props) => {

  const [input, setInput] = useState({
    user_name: '',
    password: ''
  })

  const [errorLogin, setErrorLogin] = useState('')

  const changeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitInput = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/usuarios/login`, input)
      .then(r => {
        if (r.data.msj === 'Contraseña correcta') {
          window.localStorage.setItem('accessTokenAuditoria', r.data.token)
          window.location.href = '/home-auditoria'
        } else {
          setErrorLogin(r.data.msj)
        }
      })
  }


  useEffect(() => {
    if (!props.active) {
      setErrorLogin('')
      setInput({
        user_name: '',
        password: '',
        rol:'Auditoria'
      })
    }
  }, [props.active])


  return (
    <motion.div className='containerLogin'>
      <AnimatePresence>
        {
          props.active &&

          <motion.form initial='hidden' animate='show' exit='exit' key='loginAuditoria' variants={variantsForm} onSubmit={submitInput}>
            <div className="c-loginConfeccionista">
              <label className='nombreLogin' >Nombre: </label>
              <input className='inputLogin' onChange={changeInput} name='user_name' type="text" />
              <label className='nombreLogin' >Contraseña: </label>
              <input className='inputLogin' onChange={changeInput} name='password' type="password" />
              <input type='submit' className='btn-loginConfeccionista' value='Ingresar' />
            </div>
          </motion.form>
        }
        {
          errorLogin !== '' && <div className='errorLogin'>{errorLogin}</div>
        }
      </AnimatePresence>
    </motion.div>
  )
}

export default LoginAuditoria
