import { useEffect, useState } from "react"

import axios from 'axios'

import './form-auditoria.css'


const FormAuditoria = (props) => {
  
  const [countFault, setCountFault] = useState([])
  const [countMissing, setCountMissing] = useState([]) 
  const [activeButon, setActiveButon] = useState(false)

  const [input, setInput]= useState({
    fecha_auditoria:'',
    auditor: '',
    composicion: '',
    unidades_muestra:'',
    muestra_fisica:'',
    tipo_revision:'',
    colaboradores_karibik:'',
    no_conformidades:[],
    segundas:'',
    faltantes:[],
    faltantesTotal:'',
    primeras:'',
    cobros:{
      descripcion_cobros:'',
      cantidad_cobros:'',
      valor_cobros:''
    }
  })

  const addFault = (e) => {
    setCountFault([...countFault, 1])

  }

  const removeFault=()=>{
    let countActual = countFault
    countActual.pop()
    setCountFault([...countActual])

    let arrayNoConformidades = input.no_conformidades
    if(countActual.length + 1 === arrayNoConformidades.length){
      arrayNoConformidades.pop()

    }
    if(arrayNoConformidades[0] != undefined && Number(arrayNoConformidades[0].cantidad != NaN )){
      const segundas = arrayNoConformidades.length > 1 ? arrayNoConformidades.reduce((acc,b)=>{
        acc = acc +Number(b?.cantidad)
        return acc
      }, 0 ) :
      arrayNoConformidades.length === 1 ? Number(arrayNoConformidades[0].cantidad) : '';
      
      const faltantesTotal = input.faltantesTotal === '' ? 0 : input.faltantesTotal;
      const primeras = Number(props.data.unidades) - (Number(segundas) + faltantesTotal)
  
      return setInput({...input, no_conformidades: arrayNoConformidades,
                  segundas,
                  primeras})
    }else{
      const segundas = ''
      
      const faltantesTotal = input.faltantesTotal === '' ? 0 : input.faltantesTotal;
      const primeras = Number(props.data.unidades) - (Number(segundas) + faltantesTotal)
  
      return setInput({...input, no_conformidades: arrayNoConformidades,
                  segundas,
                  primeras})
    }



  }

  const addMissing=()=>{
    setCountMissing([...countMissing, 1])
    
  }

  const removeMissing=()=>{
    let countActual = countMissing
    countActual.pop()
    setCountMissing([...countActual])

    let arrayFaltantes = input.faltantes

    if(countActual.length + 1 === arrayFaltantes.length){
      arrayFaltantes.pop()
    }
    if(arrayFaltantes[0] != undefined && Number(arrayFaltantes[0].cantidad) != NaN){
      const faltantesTotal = arrayFaltantes.length > 1 ? arrayFaltantes.reduce((acc, b)=>{
        acc = acc + Number(b?.cantidad)
        return acc
      },0 ) :
      arrayFaltantes.length === 1 ?   Number(arrayFaltantes[0].cantidad) : '';
  
      const segundas =  input.segundas === '' ? 0 : input.segundas;
  
      const primeras = Number(props.data.unidades) -(Number(faltantesTotal) + segundas)
      
      setInput({...input, faltantes: arrayFaltantes,
                  faltantesTotal,
                  primeras })

    }else{
      const faltantesTotal = ''

      const segundas =  input.segundas === '' ? 0 : input.segundas;
      const primeras = Number(props.data.unidades) -(Number(faltantesTotal) + segundas)
      
      setInput({...input, faltantes: arrayFaltantes,
                  faltantesTotal,
                  primeras })

    }

  }




  const changeInputNoconformidades=(e)=>{

    const {value, name} = e.target
    let arrayNoConformidades= input.no_conformidades

    if(name.slice(0,7) === 'defecto' ){
      let newdefect ={}
      newdefect[name.slice(0,7)] = value
      arrayNoConformidades[name.slice(7)] = {...arrayNoConformidades[name.slice(7)], ...newdefect}
      return setInput({...input, no_conformidades:[...arrayNoConformidades]})

    } else if(name.slice(0,8) === 'cantidad'){

      const filtroNum= '1234567890.'
      for( let i = 0; i< value.length ;i++){
        if(filtroNum.indexOf(value[i]) === -1){
          return document.getElementById(`cantidadD${name.slice(8)}`).value = 
          input.no_conformidades[name.slice(8)]?.cantidad ? input.no_conformidades[name.slice(8)]?.cantidad : '';
        }
      }

      let newCantidad ={}
      newCantidad[name.slice(0,8)] = value
      arrayNoConformidades[name.slice(8)] = {...arrayNoConformidades[name.slice(8)], ...newCantidad}

      const segundas = arrayNoConformidades.length > 1 ? arrayNoConformidades.reduce((acc,b)=>{
        if(Number(b?.cantidad)){
          acc = acc + Number(b.cantidad)
        }else{
          acc = acc +0
        }
        return acc
      }, 0 ) :
      arrayNoConformidades.length === 1 ?  Number(arrayNoConformidades[0].cantidad) : '';

      const faltantesTotal = input.faltantesTotal === '' ? 0 : input.faltantesTotal
      const primeras = Number(props.data.unidades) - (Number(segundas) + faltantesTotal)

      return setInput({...input, no_conformidades:[...arrayNoConformidades], 
        segundas,
        primeras})

    }
  }

  const changeInputFaltantes=(e)=>{

    const {value, name} = e.target
    let arrayFaltantes= input.faltantes

    if(name.slice(0,5) === 'talla' ){
      let newFalt ={}
      newFalt[name.slice(0,5)] = value
      arrayFaltantes[name.slice(5)] = {...arrayFaltantes[name.slice(5)], ...newFalt}
      return setInput({...input, faltantes:[...arrayFaltantes]})

    } else if(name.slice(0,8) === 'cantidad'){

      const filtroNum= '1234567890.'
      for( let i = 0; i< value.length ;i++){
        if(filtroNum.indexOf(value[i]) === -1){
          return document.getElementById(`cantidadF${name.slice(8)}`).value =
          input.faltantes[name.slice(8)]?.cantidad ?  input.faltantes[name.slice(8)].cantidad : '';
        }
      }
      let newCantidad ={}
      newCantidad[name.slice(0,8)] = value
      arrayFaltantes[name.slice(8)] = {...arrayFaltantes[name.slice(8)], ...newCantidad}
      const faltantesTotal = arrayFaltantes.length > 1 ? arrayFaltantes.reduce((acc, b)=>{
        if(Number(b?.cantidad)){
          acc = acc+ Number(b.cantidad)
        }else{
          acc = acc + 0
        }
        return acc
      },0):
        arrayFaltantes.length === 1 ?  Number(arrayFaltantes[0].cantidad) : '';

      console.log(faltantesTotal)
      const segundas = input.segundas === '' ? 0 : input.segundas
      const primeras = Number(props.data.unidades) - (Number(faltantesTotal) + segundas)

      return setInput({...input, faltantes:[...arrayFaltantes],
        faltantesTotal,
        primeras
        })
    }
  }

  const changeInput=(e)=>{

    const {name, value} = e.target
    let values = {...input}

    const filtroGeneral = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz1234567890,.'
    const filtroNum= '1234567890.'
    const filtroLetra = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz'

    switch(name){

      case 'auditor': 
        for( let i = 0; i< value.length ;i++){
          if(filtroLetra.indexOf(value[i]) === -1){
            
            return document.getElementById('auditor').value = input.auditor
          }
        }
        break;

      case 'unidades_muestra': 
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            
            return document.getElementById('unidades_muestra').value = input.unidades_muestra
          }
        }
        break;

      case "colaboradores_karibik":
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            
            return document.getElementById('colaboradores_karibik').value = input.colaboradores_karibik
          }
        }
        break;

      case 'descripcion_cobros': 
        for( let i = 0; i< value.length ;i++){
          if(filtroGeneral.indexOf(value[i]) === -1){
            
            return document.getElementById('descripcion_cobros').value = input.cobros.descripcion_cobros
          }
        }
        break;
      
      case 'cantidad_cobros': 
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            
            return document.getElementById('cantidad_cobros').value = input.cobros.cantidad_cobros
          }
        }
        break;

      case 'valor_cobros': 
        for( let i = 0; i< value.length ;i++){
          if(filtroNum.indexOf(value[i]) === -1){
            
            return document.getElementById('valor_cobros').value = input.cobros.valor_cobros
          }
        }
        break;
    }

    if(name === 'descripcion_cobros' || name === 'cantidad_cobros' || name === 'valor_cobros' ){
      return setInput({...input, cobros: {...input.cobros,[name]: value }})
    }

    values = {...values, [name]: value}
    setInput({ ...values})
    

    if(values.fecha_auditoria === "" || values.auditor === '' || values.composicion === '' || values.unidades_muestra === '' || 
          values.muestra_fisica === '' || values.tipo_revision === '' || values.colaboradores_karibik === ''){
            console.log('entra')
            return setActiveButon(true)
          }
    
    setActiveButon(true)

  }

  useEffect(()=>{
    if(props.data.unidades !== undefined){
      setInput({...input, primeras:Number(props.data.unidades) })
    }
  },[props])

  const submitAuditoria=()=>{
    if(!activeButon){
      return
    }

    axios.post('http://localhost:3000/auditorias/insert', input)
    .then(r => console.log(r.data))
  }


  return (
    <div>
      <h2>Formulario Auditorias</h2>
      <div className="containerFormAuditoria">
        <form  >

          <div className="containerTwoInputs">
            <div>
              <label >Fecha Auditoria <br /> <input onChange={changeInput} type="date" name="fecha_auditoria" /></label>
            </div>
            <div>
              <label >Auditor@ <br /> <input onChange={changeInput} type="text" name="auditor" id="auditor" /></label>
            </div>
          </div>

          <div className="containerTwoInputs">

            <div>
              <label >Composicion <br /> <input onChange={changeInput} type="text" name="composicion" /></label>
            </div>
            <div>
              <label >Unidades de Muestra <br /> <input onChange={changeInput} type="text" name="unidades_muestra" id="unidades_muestra" /></label>
            </div>

          </div>

          <div className="containerTwoInputs">

            <div>
              <label >Muestra Fisica <br />
                <select onChange={changeInput} name="muestra_fisica" >
                  <option value="">Escoge</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div>
              <label >Tipo Revision <br />
                <select onChange={changeInput} name="tipo_revision" >
                  <option value="">Escoge</option>
                  <option value="premuestra">Premuestra</option>
                  <option value="produccion">Produccion</option>
                </select>
              </label>
            </div>

          </div>

          <div className="containerTwoInputs">

            <div>
              <label >Colaboradores Kariik<br /> <input onChange={changeInput} type="text" name="colaboradores_karibik" id="colaboradores_karibik" /></label>
            </div>
          </div>

          <h2>No conformidades</h2>
          <div className="containerAddyRemove">
            <div onClick={addFault} className="butonAddCampo" >Agregar campo</div>
            <div onClick={removeFault} className="butonRemoveCampo" >Eliminar campo</div>
          </div>
          {
            countFault.length > 0 && countFault.map((e,i)=>
              
            <div key={i}>
              <div className="containerTwoInputs">
                <div>
                  <label >Defecto en:<br />
                    <select onChange={changeInputNoconformidades} name={`defecto${i}`} >
                    <option value="">Escoge Defecto</option>
                      <option value="tela">Tela</option>
                      <option value="corte">Corte</option>
                      <option value="bordado">Bordado</option>
                      <option value="estampacion_localizada">Estampacion Localizada</option>
                      <option value="confeccion">Confeccion</option>
                      <option value="lavanderia">Lavanderia</option>
                      <option value="calzado">Calzado</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label >Cantidad<br/><input onChange={changeInputNoconformidades} type="text" name={`cantidad${i}`} id={`cantidadD${i}`}/></label>
                </div>
              </div>

            </div>
              )
          }

          {
            input.segundas !== ''  && 
            <div className="containerTwoInputs">
              <div>
                <label >Segundas Total</label> <br /> <p>{input.segundas}</p>
              </div>
            </div>
          }
          


          <h2>Faltantes</h2>
          <div className="containerAddyRemove">
            <div onClick={addMissing} className="butonAddCampo" >Agregar campo</div>
            <div onClick={removeMissing} className="butonRemoveCampo" >Eliminar campo</div>
          </div>
          {
            countMissing.length > 0 && countMissing.map((e,i) =>
              <div key={i} className="containerTwoInputs">
              <div>
                <label >Talla<br />
                  <select name={`talla${i}`} onChange={changeInputFaltantes}>
                    <option value="">Escoge Talla</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="xxs">XXS</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                  </select>
                </label>
              </div>
              <div>
                <label >Cantidad <br /> <input id={`cantidadF${i}`} name={`cantidad${i}`} onChange={changeInputFaltantes} type="text" /></label>
              </div>
            </div>
            )
          }

          {
            input.faltantesTotal !== ''  && 
            <div className="containerTwoInputs">
              <div>
                <label >Faltantes Total</label> <br /> <p>{input.faltantesTotal}</p>
              </div>
            </div>
          }
          {
            input.primeras !== "" &&
            <div>
              <div >Primeras Total</div >
                <div>{input.primeras}</div>
            </div>
          }
          

          <h2>Cobros</h2>
          <div className="containerTwoInputs">
            <div>
              <label >Descripcion  <br /> <input onChange={changeInput} type="text" name="descripcion_cobros" id="descripcion_cobros" /></label>
            </div>
            <div>
              <label >Cantidad  <br /> <input onChange={changeInput} type="text" name="cantidad_cobros" id="cantidad_cobros" /></label>
            </div>
            <div>
              <label >Valor  <br /> <input onChange={changeInput} type="text" name="valor_cobros" id="valor_cobros" /></label>
            </div>
          </div>

          <div className={ activeButon ? "buttonAuditoria" : "buttonAuditoriaNoActive"} onClick={submitAuditoria}>Agregar Auditoria</div>

        </form>
      </div>
    </div>
  )
}

export default FormAuditoria
