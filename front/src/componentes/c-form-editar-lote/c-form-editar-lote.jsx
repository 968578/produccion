import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";

import './c-form-editar-lote.css'


const variantsConfirmUpdate = {
  hidden: {
    scale: 0
  },
  show: {
    scale: 1,
  }
}

const variantsFormEditLolte = {
  hidden: {
    y: 1000,
    transition: {
      duration: 1
    }
  },
  show: {
    y: 0,
    transition: {
      duration: 1
    }
  }
}

const EditarLote = (props) => {

  const params = useParams();

  const [activeButon, setActiveButon] = useState(true)
  const [confirmUpdate, setConfirmUpdate] = useState('')
  const [confeccionistas, setConfeccionistas] = useState([])

  const [input, setInput] = useState({
    op: '',
    referencia: '',
    coleccion:'',
    fecha_ingreso_cedi:'',
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

  const [errors, setErrors] = useState({
  })


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

      case 'referencia':
        for (let i = 0; i < value.length; i++) {
          if (filtroGeneral.indexOf(value[i]) === -1) {
            return document.getElementById('referencia').value = input.referencia
          }
        }
        break;

        case 'coleccion':
          for (let i = 0; i < value.length; i++) {
            if (filtroGeneral.indexOf(value[i]) === -1) {
              return document.getElementById('coleccion').value = input.coleccion
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
          if (filtroLetra.indexOf(value[i]) === -1) {
            return document.getElementById('estado').value = input.estado
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

    // arrau de valores , claves y errores para verificar en el if 
    let arrayInputValues = Object.values(values)
    let arrayinputKeys = Object.keys(values)
    let arrayErrosLocal = Object.keys(errorslocal)

    for (let i = 0; i < arrayInputValues.length; i++) {

      if (arrayinputKeys[i] !== 'confeccionista' && arrayinputKeys[i] !== 'fecha_asignacion' && arrayinputKeys[i] !== 'fecha_entrega' &&
        arrayinputKeys[i] !== 'fecha_probable_entrega' && arrayinputKeys[i] !== 'capacidad' && arrayinputKeys[i] !== 'ciclo' &&
        arrayinputKeys[i] !== 'eficiencia' && arrayinputKeys[i] !== 'modulo' && arrayinputKeys[i] !== 'zona' &&
        arrayinputKeys[i] !== 'auditado' && arrayinputKeys[i] !== 'observacion') {

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
    console.log(input)
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.put(`${process.env.REACT_APP_API_URL}/lotes/update`, input, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        console.log(r.data)
        if (r.data.msj === 'Lote actualizado con exito') {
          setConfirmUpdate(r.data.msj)
          window.scrollTo(0, document.body.scrollHeight);
          setTimeout(() => {
            window.location.reload()
          }, 1300)
        } else {
          setConfirmUpdate(r.data.msj)
          window.scrollTo(0, document.body.scrollHeight);
          setTimeout(() => {
            window.location.reload()
          }, 4000)
        }
      })
  }


  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAdmin')
    const op = { op: params.op }
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/op`, {
      params: op,
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setInput(r.data)
      })
  }, []);

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
    if (props.active === true) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    } else if (props.active === false) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [props.active])


  return (
    <div>
      <AnimatePresence>
        {
          props.active &&

          <motion.div initial='hidden' animate='show' exit='hidden' variants={variantsFormEditLolte} className="containerEditForm">
            <div className="cancelEdit" >
              <div onClick={props.closeEdit} className="containerEliminar">
                <div>Cancelar</div>
                <div className="L"></div>
                <div className="X"></div>
              </div>
            </div>
            <div className="titleEditLote">Editando Lote</div>
            <div className="opEditLote">{input.op}</div>

            <div>
              <form >
                <div className='containerForm'>

                  <div className="containerTwoInputs" >
                    <div>
                      <label className="titleEditLote">Referencia <span className='asterisco'>*</span><br /><input id='referencia' defaultValue={input.referencia} name='referencia' onChange={changeInput} type="text" /> </label>
                    </div>
                  </div>


                  <div className="containerTwoInputs" >
                    <div className='itemIzquierdo'>
                      <label className='titleEditLote'>Coleccion <span className='asterisco'>*</span><br /><input defaultValue={input.coleccion} id='coleccion'  name='coleccion' onChange={changeInput} type="text" /> </label>
                    </div>
                    <div>
                      <label className='titleEditLote'>Fecha Maxima Ingreso Cedi <span className='asterisco'>*</span><br /><input defaultValue={input.fecha_ingreso_cedi} id='fecha_ingreso_cedi'  name='fecha_ingreso_cedi' onChange={changeInput} type="date" /> </label>
                    </div>
                  </div>

                  <div className="containerTwoInputs">
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Tejido <span className='asterisco'>*</span><br /><input id='tejido' defaultValue={input.tejido} name='tejido' onChange={changeInput} type="text" /> </label>
                    </div>
                    <div>
                      <label className="titleEditLote">Tipo producto <span className='asterisco'>*</span><br /><input id='tipo_producto' defaultValue={input.tipo_producto} name='tipo_producto' onChange={changeInput} type="text" /> </label>
                    </div>
                  </div>

                  <div className="containerTwoInputs">
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Unidades <span className='asterisco'>*</span><br /><input id='unidades' defaultValue={input.unidades} name='unidades' onChange={changeInput} type="text" /> </label>
                    </div>
                    <div>
                      <label className="titleEditLote">Sam <span className='asterisco'>*</span><br /><input id='sam' defaultValue={input.sam} name='sam' onChange={changeInput} type="text" /> </label>
                    </div>
                  </div>

                  <div className="containerTwoInputs">
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Estado <span className='asterisco'>*</span></label> <br />
                      <select id='listestado' defaultValue={input.estado} name='estado' onChange={changeInput} >
                        <option value="">Escoge Estado</option>
                        <option value="Corte">Corte</option>
                        <option value="Lote Integracion">Lote Integracion</option>
                        <option value="Para Asignar">Para Asignar</option>
                        <option value="Recepcion">Recepcion</option>
                        <option value="Preparacion">Preparacion</option>
                        <option value="Confeccion">Confeccion</option>
                        <option value="Lavanderia">Lavanderia</option>
                        <option value="Terminacion">Terminacion</option>
                        <option value="Liberado">Liberado</option>
                        <option value="Paro">Paro</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                    <div>
                      <label className="titleEditLote">Confeccionista<br /><input type="text" defaultValue={input.confeccionista} name="confeccionista" list='confeccionistaList' id="confeccionista" onChange={changeInput} /> </label>
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
                      <label className="titleEditLote">Fecha de Asignacion <br /><input defaultValue={input.fecha_asignacion} name='fecha_asignacion' onChange={changeInput} type="date" /> </label>
                    </div>
                    <div>
                      <label className="titleEditLote">Fecha de Entrega <br /><input defaultValue={input.fecha_entrega} name='fecha_entrega' onChange={changeInput} type="date" /> </label>
                    </div>
                  </div>

                  <div className="containerTwoInputs">
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Capacidad <br /><input id='capacidad' defaultValue={input.capacidad} name='capacidad' onChange={changeInput} type="text" /> </label>
                    </div>
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Modulo <br /><input id='modulo' defaultValue={input.modulo} name='modulo' onChange={changeInput} type="text" /> </label>
                    </div>
                  </div>

                  <div className="containerTwoInputs">
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Fecha Probable de Entrega <br /><input defaultValue={input.fecha_probable_entrega} name='fecha_probable_entrega' onChange={changeInput} type="date" /> </label>
                    </div>
                    <div>
                      <label className="titleEditLote">Eficiencia <br /><input id='eficiencia' defaultValue={input.eficiencia} name='eficiencia' onChange={changeInput} type="text" /> </label>
                      {
                        input?.eficiencia?.length > 1 && <p className='helps'>{input.eficiencia}</p>
                      }
                    </div>
                  </div>

                  <div className="containerTwoInputs">
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Valor Unidad <span className='asterisco'>*</span><br /><input defaultValue={input.valor_unidad} placeholder='$' id='valor_unidad' name='valor_unidad' onChange={changeInput} type="text" /> </label>
                      {
                        input.valor_unidad && <p className='helps'>{new Intl.NumberFormat().format(input.valor_unidad)}$</p>
                      }
                    </div>
                    <div className='itemIzquierdo'>
                      <label className="titleEditLote">Modulo <br /><input id='modulo' defaultValue={input.modulo} name='modulo' onChange={changeInput} type="text" /> </label>
                    </div>
                    <div>
                      <label className="titleEditLote">Zona <br /><input id='zona' defaultValue={input.zona} name='zona' onChange={changeInput} type="text" /> </label>
                    </div>
                  </div>

                  <div className={activeButon ? 'botonForm' : 'botonFormD'} onClick={submitInput}>Actualizar</div>

                </div>
              </form>
            </div>
            {
              confirmUpdate && <motion.p animate='show' initial='hidden' variants={variantsConfirmUpdate} className="confirmUpdateLote">{confirmUpdate}</motion.p>
            }
          </motion.div>
        }
      </AnimatePresence>

    </div>
  )
}

export default EditarLote
