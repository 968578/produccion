import axios from 'axios'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import './form-lotes.css'

const FormLotes=()=>{

  const [activeButon, setActiveButon] = useState(false)
  const [confirmCreate, setConfirmCreate] = useState('')
  const [opRepeat, setOpRepeat] = useState('')
  const [confeccionistas, setConfeccionistas] = useState([])

  const [input, setInput] =  useState({
    op:'',
    referencia:'',
    tejido:'',
    tipo_producto:'',
    unidades:'',
    sam:'',
    estado:'',
    confeccionista:'',
    fecha_asignacion:'',
    fecha_entrega:'',
    capacidad:'',
    ciclo:'',
    fecha_probable_entrega:'',
    eficiencia:'',
    valor_unidad:'',
    modulo:'',
    zona:''
  })

  const [errors, setErrors] = useState({

  })


  const changeInput=(e)=>{

    const {name, value} = e.target

    let values = {...input, [name]:value}
    let errorslocal = {...errors}

    const filtroGeneral = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz1234567890'
    const filtroNum= '1234567890.'
    const filtroLetra = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz'
    const filtroConfeccionista = confeccionistas.map( e => e.nombre)

    switch(name){
      case 'op':  
        for( let i = 0; i< value.length ;i++){
          if(filtroGeneral.indexOf(value[i]) === -1){
            
            return document.getElementById('op').value = input.op
          }
        }
        break;

      case 'referencia':
        for( let i = 0; i< value.length ;i++){
          if(filtroGeneral.indexOf(value[i]) === -1){
            return document.getElementById('referencia').value = input.referencia
          }
        }
        break;

      case 'tejido': 
        for( let i = 0; i< value.length ;i++){
          if(filtroLetra.indexOf(value[i]) === -1){
            return document.getElementById('tejido').value = input.tejido
          }
        }
        break;
      
      case 'tipo_producto':
        for( let i = 0; i< value.length ;i++){
          if(filtroLetra.indexOf(value[i]) === -1){
            return document.getElementById('tipo_producto').value = input.tipo_producto
          }
        }
        break;

      case 'unidades':
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('unidades').value = input.unidades
          }
        }
        break;

      case 'sam':
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('sam').value = input.sam            
          }
        }
        break;

      case 'confeccionista': 
        for( let i = 0; i< value.length ;i++){
          if(filtroLetra.indexOf(value[i]) === -1){
            return document.getElementById('estado').value = input.estado
          }
        }
        if(!filtroConfeccionista.includes(value)){
          console.log('hola')
          errorslocal.confeccionista = 'El confeccionista No existe'
        }else{
          delete errorslocal.confeccionista
        }
        break;

      case 'capacidad':
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('capacidad').value = input.capacidad
          }
        }
        break;

      case 'ciclo':
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('ciclo').value = input.ciclo
          }
        }
        break;

      case 'eficiencia': 
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('eficiencia').value = input.eficiencia
          }
        }
        break;

      case 'valor_unidad': 
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('valor_unidad').value = input.valor_unidad            
          }
        }
        break;

      case 'modulo': 
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            return document.getElementById('modulo').value = input.modulo
          }
        }
        break;

      case 'zona': 
        for( let i = 0; i< value.length ;i++){
          if(filtroLetra.indexOf(value[i]) === -1){
            return document.getElementById('zona').value = input.zona
          }
        }
        break;
    }

    if(name === 'eficiencia'){
      setInput({...input, [e.target.name]: value+'%'})
    }else{
      setInput({...input, [e.target.name]: value})
    }
    
    setErrors({...errorslocal})
    
    let arrayInputValues= Object.values(values)
    let arrayErrosLocal = Object.keys(errorslocal)

    for(let i =0; i< arrayInputValues.length ; i++){
      
      if(arrayInputValues[i] ==='' || arrayErrosLocal.length > 0){
        return setActiveButon(false)
      }
    }
    setActiveButon(true)

  }




  const submitInput=()=>{
    if(!activeButon){
      return
    }
    console.log(input)
    axios.post('http://localhost:3000/lotes/insert', input)
    .then(r => {
      console.log(r)
      if(r.data === 'Agregado con exito'){
        setConfirmCreate(r.data)
        setOpRepeat('')
      }else {
        setOpRepeat(r.data)
        setConfirmCreate('')
      }
    })
  }
  useEffect(()=>{
    axios.get('http://localhost:3000/confeccionistas/get')
    .then(r => setConfeccionistas(r.data))
  },[])

  return(
    <div>

      <div className='containerHomeButton'>
        <Link to='/home-admin' className='HomeFormLote'>Home</Link>
      </div>

      <h2>
        Ingresa un nuevo lote
      </h2>

      <div >
        <form>
          <div className='containerForm'>

            <div className="containerTwoInputs" >
              <div className='itemIzquierdo'>
                <label>OP <br /><input id='op' name='op'  onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label>Referencia <br /><input id='referencia' name='referencia' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label>Tejido <br /><input id='tejido' name='tejido' onChange={changeInput}  type="text" /> </label>
              </div>
              <div>
                <label>Tipo producto <br /><input id='tipo_producto' name='tipo_producto' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label>Unidades <br /><input id='unidades' name='unidades' onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label>Sam <br /><input id='sam' name='sam' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label>Estado</label> <br /> 
                <select id='listestado' name='estado' onChange={changeInput} >
                  <option value="">Escoge Estado</option>
                  <option value="Paro">Paro</option>
                  <option value="Recepcion">Recepcion</option>
                  <option value="Preparacion">Preparacion</option>
                  <option value="Confeccion">Confeccion</option>
                  <option value="Terminacion">Terminacion</option>
                  <option value="Liberado">Liberado</option>
                </select> 
              </div>
              <div>
                <label>Confeccionista<br /><input type="text" name="confeccionista" list='confeccionistaList' id="confeccionista"  onChange={changeInput} /> </label>
                <datalist id='confeccionistaList' >
                  {
                    confeccionistas.length > 0 && confeccionistas.map((e,i)=>
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
                <label>Fecha de Asignacion <br /><input name='fecha_asignacion' onChange={changeInput} type="date" /> </label>
              </div>
              <div>
                <label>Fecha de Entrega <br /><input name='fecha_entrega' onChange={changeInput} type="date" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label>Capacidad <br /><input id='capacidad' name='capacidad' onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label>Ciclo <br /><input id='ciclo' name='ciclo' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label>Fecha Probable de Entrega <br /><input name='fecha_probable_entrega' onChange={changeInput} type="date" /> </label>
              </div>
              <div>
                <label>Eficiencia <br /><input id='eficiencia' name='eficiencia' onChange={changeInput} type="text" /> </label>
                {
                  input.eficiencia.length > 1 && <p className='helps'>{input.eficiencia}</p>
                }
              </div>
            </div>

            <div className="containerTwoInputs">
              <div className='itemIzquierdo'>
                <label>Valor Unidad <br /><input placeholder='$' id='valor_unidad' name='valor_unidad' onChange={changeInput} type="text" /> </label>
                {
                  input.valor_unidad && <p className='helps'>{new Intl.NumberFormat().format(input.valor_unidad)}$</p>
                }
              </div>
              <div className='itemIzquierdo'>
                <label>Modulo <br /><input id='modulo' name='modulo' onChange={changeInput} type="text" /> </label>
              </div>
              <div>
                <label>Zona <br /><input id='zona' name='zona' onChange={changeInput} type="text" /> </label>
              </div>
            </div>

            <div  className={activeButon ? 'botonForm' : 'botonFormD'} onClick={submitInput}>Crear</div>

          </div>
        </form>
      </div>
      {
        confirmCreate && <p className='ConfirmCreateLote' >{confirmCreate}</p>
      }
      {
        opRepeat && <p className='ErrorOpRepeat'>{opRepeat}</p>
      }

    </div>
  )
}

export default FormLotes
