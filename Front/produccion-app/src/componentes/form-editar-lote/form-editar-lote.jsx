import { useEffect, useState } from "react"
import axios from 'axios'
import './form-editar-lote.css'

const EditarLote = (props) => {


  const [activeButon, setActiveButon] = useState(true)

  const [confirmUpdate, setConfirmUpdate] = useState('')

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
    const filtroConfeccionista = ['Confeccionista A', 'Confeccionista B','Confeccionista C','Confeccionista D', 'Confeccionista E' ]

    switch(name){

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
    
    // arrau de valores , claves y errores para verificar en el if 
    let arrayInputValues= Object.values(values)
    let arrayInputKeys = Object.keys(values)
    let arrayErrosLocal = Object.keys(errorslocal)

    // console.log(arrayInputValues)
    // console.log(arrayInputKeys)

    for(let i =0; i< arrayInputValues.length ; i++){
      // este if valida que no haya errores, que ningun espacio este en blanco y que la observacion pueda quedar en blanco.
      if((arrayInputValues[i] ==='' && arrayInputKeys[i] !== 'observacion')|| arrayErrosLocal.length > 0){
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
    axios.put('http://localhost:3000/update-lote', input)
    .then(r => {

      if(r.data === 'Actualizado con exito'){
        setConfirmUpdate(r.data)
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(()=>{
          window.location.href= `/${props.data.op}`
        },1000)
      }
    })
  }


  useEffect(()=>{
    if(props.data){
      setInput(props.data)
    }
  },[props])



  return (
    <div>
      {
        props.active &&
        
        <div className="containerEditForm">
          <div className="cancelEdit" >
            <div onClick={props.closeEdit} className="containerEliminar">
              <div>Cancelar</div> 
              <div className="L"></div> 
              <div className="X"></div> 
            </div>
          </div>
          <div>Editando Lote</div>
          <div>{input.op}</div>

          <div>
            <form >
              <div className='containerForm'>

                <div className="containerTwoInputs" >
                  <div>
                    <label>Referencia <br /><input id='referencia' defaultValue={input.referencia} name='referencia' onChange={changeInput} type="text" /> </label>
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Tejido <br /><input id='tejido' defaultValue={input.tejido} name='tejido' onChange={changeInput} type="text" /> </label>
                  </div>
                  <div>
                    <label>Tipo producto <br /><input id='tipo_producto' defaultValue={input.tipo_producto} name='tipo_producto' onChange={changeInput} type="text" /> </label>
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Unidades <br /><input id='unidades' defaultValue={input.unidades} name='unidades' onChange={changeInput} type="text" /> </label>
                  </div>
                  <div>
                    <label>Sam <br /><input id='sam' defaultValue={input.sam} name='sam' onChange={changeInput} type="text" /> </label>
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Estado</label> <br />
                    <select id='listestado' defaultValue={input.estado} name='estado' onChange={changeInput} >
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
                    <label>Confeccionista<br /><input type="text" defaultValue={input.confeccionista} name="confeccionista" list='confeccionistaList' id="confeccionista" onChange={changeInput} /> </label>
                    <datalist id='confeccionistaList' >
                      <option value="Confeccionista A">Confeccionista A</option>
                      <option value="Confeccionista B">Confeccionista B</option>
                      <option value="Confeccionista C">Confeccionista C</option>
                      <option value="Confeccionista D">Confeccionista D</option>
                      <option value="Confeccionista E">Confeccionista E</option>
                    </datalist>
                    {
                      errors.confeccionista && <p className='errors'>{errors.confeccionista}</p>
                    }
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Fecha de Asignacion <br /><input defaultValue={input.fecha_asignacion} name='fecha_asignacion' onChange={changeInput} type="date" /> </label>
                  </div>
                  <div>
                    <label>Fecha de Entrega <br /><input defaultValue={input.fecha_entrega} name='fecha_entrega' onChange={changeInput} type="date" /> </label>
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Capacidad <br /><input id='capacidad' defaultValue={input.capacidad} name='capacidad' onChange={changeInput} type="text" /> </label>
                  </div>
                  <div>
                    <label>Ciclo <br /><input id='ciclo' defaultValue={input.ciclo} name='ciclo' onChange={changeInput} type="text" /> </label>
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Fecha Probable de Entrega <br /><input defaultValue={input.fecha_probable_entrega} name='fecha_probable_entrega' onChange={changeInput} type="date" /> </label>
                  </div>
                  <div>
                    <label>Eficiencia <br /><input id='eficiencia' defaultValue={input.eficiencia} name='eficiencia' onChange={changeInput} type="text" /> </label>
                    {
                      input?.eficiencia?.length > 1 && <p className='helps'>{input.eficiencia}</p>
                    }
                  </div>
                </div>

                <div className="containerTwoInputs">
                  <div className='itemIzquierdo'>
                    <label>Valor Unidad <br /><input defaultValue={input.valor_unidad} placeholder='$' id='valor_unidad' name='valor_unidad' onChange={changeInput} type="text" /> </label>
                    {
                      input.valor_unidad && <p className='helps'>{new Intl.NumberFormat().format(input.valor_unidad)}$</p>
                    }
                  </div>
                  <div className='itemIzquierdo'>
                    <label>Modulo <br /><input id='modulo' defaultValue={input.modulo} name='modulo' onChange={changeInput} type="text" /> </label>
                  </div>
                  <div>
                    <label>Zona <br /><input id='zona' defaultValue={input.zona} name='zona' onChange={changeInput} type="text" /> </label>
                  </div>
                </div>

                <div className={activeButon ? 'botonForm' : 'botonFormD'} onClick={submitInput}>Actualizar</div>

              </div>
            </form>
          </div>
          {
            confirmUpdate && <p className="confirmUpdateLote">{confirmUpdate}</p>
          }
        </div>
      }

    </div>
  )
}

export default EditarLote
