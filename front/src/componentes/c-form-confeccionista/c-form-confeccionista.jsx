import { useEffect, useState } from 'react'

import axios from 'axios'

import { motion, AnimatePresence } from 'framer-motion'
import './c-form-confeccionista.css'


const variantsAddConfe = {
  hidden: {
    y: -200
  },
  show: {
    y: 0,
    transition: {
      duration: 0.8
    }
  },
  exit: {
    y: -200,
    transition: {
      duration: 0.8
    }
  }
}

const variantsbuttonPassword = {
  hover: {
    scale: 1.1
  }
}

const variantsConfirmAddConfe = {
  hidden: {
    scale: 0
  },
  show: {
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

const FormConfeccionista = (props) => {

  const [input, setInput] = useState({
    nombre: '',
    password: '',
    a_auditar: ''
  })
  const [activeButton, setActiveButton] = useState(false)
  const [confirmAddConfe, setConfirmAddConfe] = useState('')

  const [inputConfirm, setInputConfirm] = useState({
    nombre: '',
    password: '',
  })

  const generatePassword = () => {

    const allCaracteres = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&?¡¿+*-_.';
    let password = ''

    for (let i = 0; i < 15; i++) {
      password += allCaracteres[Math.floor(Math.random() * allCaracteres.length)]
    }

    let values = { ...input, password }
    setInput({ ...values })

    const arrayInputValues = Object.values(values)

    for (let i = 0; i < arrayInputValues.length; i++) {
      if (arrayInputValues[i] === '') {
        return setActiveButton(false)
      }
    }
    setActiveButton(true)
  }


  const submitConfeccionista = () => {
    if (!activeButton) {
      return
    }
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.post(`${process.env.REACT_APP_API_URL}/confeccionistas/insert`, input, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        if (r.data.msj === 'Confeccionista agregado con exito') {
          setConfirmAddConfe(r.data.msj)
          setTimeout(() => {
            setConfirmAddConfe('')
          }, 3000)

          setInputConfirm({
            nombre: input.nombre,
            password: input.password
          })

          document.getElementById('nombreAddConfe').value = ''
          document.getElementById('auditarNo').checked = false
          document.getElementById('auditarSi').checked = false

          setInput({
            nombre: '',
            password: ''
          })

          setActiveButton(false)
        } else if (r.data.msj === 'Confeccionista ya existe') {
          setConfirmAddConfe(r.data.msj)
        }
      })
  }


  const changeInput = (e) => {

    let values = { ...input, nombre: e.target.value }
    setInput({ ...values })

    const arrayInputValues = Object.values(values)

    for (let i = 0; i < arrayInputValues.length; i++) {
      if (arrayInputValues[i] === '') {
        return setActiveButton(false)
      }
    }
    setActiveButton(true)
  }


  const changeInputAauditar = (e) => {

    if (e.target.checked === true) {
      let values = { ...input, a_auditar: e.target.value }
      if (e.target.value === 'Si') {
        setInput({ ...values })
        document.getElementById('auditarNo').checked = false
      } else if (e.target.value === 'No') {
        setInput({ ...values })
        document.getElementById('auditarSi').checked = false
      }

      const arrayInputValues = Object.values(values)

      for (let i = 0; i < arrayInputValues.length; i++) {
        if (arrayInputValues[i] === '') {
          return setActiveButton(false)
        }
      }
      return setActiveButton(true)
    } else {
      setInput({ ...input, a_auditar: '' })
      return setActiveButton(false)
    }

  }

  useEffect(() => {
    if (props.active === false) {

      setInputConfirm({
        nombre: '',
        password: ''
      })
    }
  }, [props.active])


  return (
    <div className='containerAddConfe'>
      <AnimatePresence>
        {
          props.active === true &&
          <motion.div key='addConfe' initial='hidden' animate='show' exit='exit' variants={variantsAddConfe} className='c-addConfeAndConfirm'>
            <div>
              <form className='formConfe'>
                <label >Nombre: <span className='asterisco'>*</span></label>
                <br />
                <input onChange={changeInput} type="text" id='nombreAddConfe' />
                <br />
                <label >Contraseña: <span className='asterisco'>*</span></label>
                {
                  input.password != '' &&
                  <div className='password'>{input.password}</div>
                }
                <motion.div whileHover={{ scale: 1.1 }} className="generatePassword" onClick={generatePassword}>Generar contraseña</motion.div>
                <label >Puede Auditar? <span className='asterisco'>*</span></label>
                <br />
                <div className='c-siOrNoAudit'>
                  <label className='checkBoxSi'>Si <input className='checkBox ' type="checkbox" onChange={changeInputAauditar} name="a_auditar" id='auditarSi' value='Si' /></label>
                  <label className='checkBoxNo' >No<input className='checkBox' type="checkbox" onChange={changeInputAauditar} name="a_auditar" id='auditarNo' value='No' /></label>
                </div>


                <motion.div whileHover='hover' variants={variantsbuttonPassword} className={activeButton ? "generatePassword" : 'b-inactive'} onClick={submitConfeccionista}>Guardar</motion.div>
              </form>
            </div>

            <div>
              {
                inputConfirm.nombre.length > 0 &&
                <p className='confeCreado'>{inputConfirm.nombre}<br />{inputConfirm.password}</p>
              }
            </div>

          </motion.div>

        }
        <AnimatePresence>
          {
            confirmAddConfe.length > 0 && props.active === true && <motion.p key='confirmAddConfe' initial='hidden' exit='hidden' animate='show' variants={variantsConfirmAddConfe} className='confirmAddConfe'>{confirmAddConfe}</motion.p>

          }
        </AnimatePresence>
      </AnimatePresence>

    </div>
  )
}

export default FormConfeccionista
