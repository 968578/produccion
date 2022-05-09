import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

import './p-form-crear-lote.css'


const variantsConfirmAddLote = {
  hidden: {
    scale: 0,
    transition: {
      duration: 0.4
    }
  },
  show: {
    scale: 1,
    transition: {
      duration: 0.4
    }

  }
}



const FormLotes = () => {

  const refOp = useRef(null)
  const refReferencia = useRef(null)
  const refTejido = useRef(null)
  const refTipo_producto = useRef(null)
  const refUnidades = useRef(null)
  const refSam = useRef(null)
  const refEstado = useRef(null)
  const refConfeccionista = useRef(null)
  const refFecha_asignacion = useRef(null)
  const refFecha_entrega = useRef(null)
  const refCapacidad = useRef(null)
  const refModulo = useRef(null)
  const refFecha_probable_entrega = useRef(null)
  const refEficiencia = useRef(null)
  const refValor_unidad = useRef(null)
  const refZona = useRef(null)

  const [activeButon, setActiveButon] = useState(false)
  const [confirmCreate, setConfirmCreate] = useState('')
  const [opRepeat, setOpRepeat] = useState('')
  const [confeccionistas, setConfeccionistas] = useState([])

  const [input, setInput] = useState({
    op: '',
    referencia: '',
    tejido: '',
    tipo_producto: '',
    unidades: '',
    sam: '',
    estado: '',
    confeccionista: '',
    fecha_asignacion: '',
    fecha_entrega: '',
    capacidad: '',
    ciclo: '',
    fecha_probable_entrega: '',
    eficiencia: '',
    valor_unidad: '',
    modulo: '',
    zona: ''
  })

  const [errors, setErrors] = useState({})


  const changeInput = (e) => {

    const { name, value } = e.target

    let values = { ...input, [name]: value }
    let errorslocal = { ...errors }

    const filtroGeneral = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz1234567890'
    const filtroNum = '1234567890.'
    const filtroLetra = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz'
    let filtroConfeccionista = confeccionistas.map(e => e.nombre)
    filtroConfeccionista.push('')

    switch (name) {
      case 'op':
        for (let i = 0; i < value.length; i++) {
          if (filtroGeneral.indexOf(value[i]) === -1) {

            return document.getElementById('op').value = input.op
          }
        }
        break;

      case 'referencia':
        for (let i = 0; i < value.length; i++) {
          if (filtroGeneral.indexOf(value[i]) === -1) {
            return document.getElementById('referencia').value = input.referencia
          }
        }
        break;

      case 'tejido':
        for (let i = 0; i < value.length; i++) {
          if (filtroLetra.indexOf(value[i]) === -1) {
            return document.getElementById('tejido').value = input.tejido
          }
        }
        break;

      case 'tipo_producto':
        for (let i = 0; i < value.length; i++) {
          if (filtroLetra.indexOf(value[i]) === -1) {
            return document.getElementById('tipo_producto').value = input.tipo_producto
          }
        }
        break;

      case 'unidades':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('unidades').value = input.unidades
          }
        }
        break;

      case 'sam':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('sam').value = input.sam
          }
        }
        break;

      case 'confeccionista':
        for (let i = 0; i < value.length; i++) {
          if (filtroGeneral.indexOf(value[i]) === -1) {
            return document.getElementById('confeccionista').value = input.confeccionista
          }
        }
        if (!filtroConfeccionista.includes(value)) {
          console.log('hola')
          errorslocal.confeccionista = 'El confeccionista No existe'
        } else {
          delete errorslocal.confeccionista
        }
        break;

      case 'capacidad':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('capacidad').value = input.capacidad
          }
        }
        break;

      case 'ciclo':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('ciclo').value = input.ciclo
          }
        }
        break;

      case 'eficiencia':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('eficiencia').value = input.eficiencia
          }
        }
        break;

      case 'valor_unidad':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('valor_unidad').value = input.valor_unidad
          }
        }
        break;

      case 'modulo':
        for (let i = 0; i < value.length; i++) {
          if (filtroNum.indexOf(value[i]) === -1) {
            return document.getElementById('modulo').value = input.modulo
          }
        }
        break;

      case 'zona':
        for (let i = 0; i < value.length; i++) {
          if (filtroLetra.indexOf(value[i]) === -1) {
            return document.getElementById('zona').value = input.zona
          }
        }
        break;
    }

    if (name === 'eficiencia') {
      setInput({ ...input, [e.target.name]: value + '%' })
    } else {
      setInput({ ...input, [e.target.name]: value })
    }

    setErrors({ ...errorslocal })

    let arrayInputValues = Object.values(values)
    let arrayinputKeys = Object.keys(values)
    let arrayErrosLocal = Object.keys(errorslocal)


    for (let i = 0; i < arrayInputValues.length; i++) {

      if (arrayinputKeys[i] !== 'confeccionista' && arrayinputKeys[i] !== 'fecha_asignacion' && arrayinputKeys[i] !== 'fecha_entrega' &&
        arrayinputKeys[i] !== 'fecha_probable_entrega' && arrayinputKeys[i] !== 'capacidad' && arrayinputKeys[i] !== 'ciclo' &&
        arrayinputKeys[i] !== 'eficiencia' && arrayinputKeys[i] !== 'modulo' && arrayinputKeys[i] !== 'zona') {
        // console.log(arrayinputKeys[i], i)

        if (arrayInputValues[i] === '' || arrayErrosLocal.length > 0) {

          return setActiveButon(false)
        }
      }
    }
    setActiveButon(true)

  }


  const submitInput = () => {
    if (!activeButon) {
      return
    }
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.post(`${process.env.REACT_APP_API_URL}/lotes/insert`, input, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        if (r.data === 'Agregado con exito') {
          setConfirmCreate(r.data)
          setOpRepeat('')
          setTimeout(() => {
            setConfirmCreate('')
          }, 3000)

          refOp.current.value = ''
          refReferencia.current.value = ''
          refTejido.current.value = ''
          refTipo_producto.current.value = ''
          refUnidades.current.value = ''
          refSam.current.value = ''
          refEstado.current.value = ''
          refConfeccionista.current.value = ''
          refFecha_asignacion.current.value = ''
          refFecha_entrega.current.value = ''
          refCapacidad.current.value = ''
          refModulo.current.value = ''
          refFecha_probable_entrega.current.value = ''
          refEficiencia.current.value = ''
          refValor_unidad.current.value = ''
          refZona.current.value = ''

          setInput({
            op: '',
            referencia: '',
            tejido: '',
            tipo_producto: '',
            unidades: '',
            sam: '',
            estado: '',
            confeccionista: '',
            fecha_asignacion: '',
            fecha_entrega: '',
            capacidad: '',
            ciclo: '',
            fecha_probable_entrega: '',
            eficiencia: '',
            valor_unidad: '',
            modulo: '',
            zona: ''
          })

          setErrors({})
          setActiveButon(false)

        } else {
          setOpRepeat(r.data)
          setConfirmCreate('')
          setTimeout(() => {
            setOpRepeat('')
          }, 4000)
        }
      })




  }


  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.get(`${process.env.REACT_APP_API_URL}/confeccionistas/get`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setConfeccionistas(r.data.results)
      })
  }, [])

  useEffect(() => {
    if (!window.localStorage.getItem('accessTokenAdmin')) {
      window.location.href = '/'
    }
  }, [])


  return (
    <div>

      <div className='containerHomeButton'>
        <Link to='/home-admin' className='HomeFormLote'>Home</Link>
      </div>

      <h2 className='titleNewLote'>
        Ingresa un nuevo lote
      </h2>

      <div >
        <form>
          <div className='containerForm'>

            <div className="containerTwoInputs" >
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>OP <br /><input id='op' ref={refOp} name='op' onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label className='titleCrearLote'>Referencia <br /><input id='referencia' ref={refReferencia} name='referencia' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Tejido <br /><input id='tejido' ref={refTejido} name='tejido' onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label className='titleCrearLote'>Tipo producto <br /><input id='tipo_producto' ref={refTipo_producto} name='tipo_producto' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Unidades <br /><input id='unidades' ref={refUnidades} name='unidades' onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label className='titleCrearLote'>Sam <br /><input id='sam' ref={refSam} name='sam' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Estado</label> <br />
                <select id='listestado' ref={refEstado} name='estado' onChange={changeInput} >
                  <option value="">Escoge Estado</option>
                  <option value="Paro">Paro</option>
                  <option value="Recepcion">Recepcion</option>
                  <option value="Preparacion">Preparacion</option>
                  <option value="Confeccion">Confeccion</option>
                  <option value="Terminacion">Terminacion</option>
                  <option value="Corte">Corte</option>
                  <option value="Lote Integracion">Lote Integracion</option>
                  <option value="Para Asignar">Para Asignar</option>
                  <option value="Lavanderia">Lavanderia</option>
                  <option value="Liberado">Liberado</option>
                </select>
              </div>
              <div>
                <label className='titleCrearLote'>Confeccionista<br /><input ref={refConfeccionista} type="text" name="confeccionista" list='confeccionistaList' id="confeccionista" onChange={changeInput} /> </label>
                <datalist id='confeccionistaList' >
                  {
                    confeccionistas.length > 0 && confeccionistas.map((e, i) =>
                      <option key={i} value={e.nombre}>{e.nombre}</option>

                    )
                  }
                </datalist>
                {
                  errors.confeccionista && <p className='errors'>{errors.confeccionista}</p>
                }
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Fecha de Asignacion <br /><input ref={refFecha_asignacion} name='fecha_asignacion' onChange={changeInput} type="date" /> </label>
              </div>
              <div>
                <label className='titleCrearLote'>Fecha de Entrega <br /><input ref={refFecha_entrega} name='fecha_entrega' onChange={changeInput} type="date" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Capacidad <br /><input ref={refCapacidad} id='capacidad' name='capacidad' onChange={changeInput} type="text" /> </label>
              </div>
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Modulo <br /><input ref={refModulo} id='modulo' name='modulo' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Fecha Probable de Entrega <br /><input ref={refFecha_probable_entrega} name='fecha_probable_entrega' onChange={changeInput} type="date" /> </label>
              </div>
              <div>
                <label className='titleCrearLote'>Eficiencia <br /><input ref={refEficiencia} id='eficiencia' name='eficiencia' onChange={changeInput} type="text" /> </label>
                {
                  input.eficiencia.length > 1 && <p className='helps'>{input.eficiencia}</p>
                }
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label className='titleCrearLote'>Valor Unidad <br /><input ref={refValor_unidad} placeholder='$' id='valor_unidad' name='valor_unidad' onChange={changeInput} type="text" /> </label>
                {
                  input.valor_unidad && <p className='helps'>{new Intl.NumberFormat().format(input.valor_unidad)}$</p>
                }
              </div>
              <div>
                <label className='titleCrearLote'>Zona <br /><input ref={refZona} id='zona' name='zona' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className={activeButon ? 'botonForm' : 'botonFormD'} onClick={submitInput}>Crear</div>

          </div>
        </form>
      </div>
      <AnimatePresence>
        {
          confirmCreate && <motion.p initial='hidden' animate='show' exit='hidden' variants={variantsConfirmAddLote} className='ConfirmCreateLote' >{confirmCreate}</motion.p>
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          opRepeat && <motion.p initial='hidden' animate='show' exit='hidden' variants={variantsConfirmAddLote} className='ErrorOpRepeat'>{opRepeat}</motion.p>
        }
      </AnimatePresence>

    </div>
  )
}

export default FormLotes
