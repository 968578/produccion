import { useEffect, useState } from "react"

import './form-auditoria.css'


const FormAuditoria = () => {

  const [countFault, setCountFault] = useState([])
  const [countMissing, setCountMissing] = useState([]) 

  const addFault = (e) => {
    setCountFault([...countFault, 1])

  }

  const removeFault=()=>{
    let countActual = countFault
    countActual.pop()
    setCountFault([...countActual])
  }

  const addMissing=()=>{
    setCountMissing([...countMissing, 1])
  }

  const removeMissing=()=>{
    let countActual = countMissing
    countActual.pop()
    setCountMissing([...countActual])
  }

  // useEffect(() => {
  //   console.log(countFault)
  // }, [countFault])

  return (
    <div>
      <h2>Formulario Auditorias</h2>
      <div>
        <form >

          <div className="containerTwoInputs">
            <div>
              <label >Fecha Auditoria <br /> <input type="date" name="fecha_auditoria" /></label>
            </div>
            <div>
              <label >Auditor@ <br /> <input type="text" name="fecha_auditoria" /></label>
            </div>
          </div>

          <div className="containerTwoInputs">

            <div>
              <label >Composicion <br /> <input type="text" name="fecha_auditoria" /></label>
            </div>
            <div>
              <label >Unidades de Muestra <br /> <input type="text" name="fecha_auditoria" /></label>
            </div>

          </div>

          <div className="containerTwoInputs">

            <div>
              <label >Muestra Fisica <br />
                <select name="" id="">
                  <option value="si">Si</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div>
              <label >Tipo Revision <br />
                <select name="" id="">
                  <option value="premuestra">Premuestra</option>
                  <option value="produccion">Produccion</option>
                </select>
              </label>
            </div>

          </div>

          <div className="containerTwoInputs">

            <div>
              <label >Colaboradores Kariik<br /> <input type="text" name="fecha_auditoria" /></label>
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
                    <select name="" id="">
                      <option value="Tela">Tela</option>
                      <option value="corte">Corte</option>
                      <option value="bordado">Bordado</option>
                      <option value="estampacio_localizada">Estampacion Localizada</option>
                      <option value="confeccion">Confeccion</option>
                      <option value="lavanderia">Lavanderia</option>
                      <option value="calzado">Calzado</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label >Cantidad <br /> <input type="text" name="fecha_auditoria" /></label>
                </div>
              </div>

              <div className="containerTwoInputs">
                <div>
                  <label >Segundas Cantidad <br /> <input type="text" name="fecha_auditoria" /></label>
                </div>
              </div>
            </div>
              )
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
                  <select name="" id="">
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
                <label >Cantidad <br /> <input type="text" name="fecha_auditoria" /></label>
              </div>
            </div>
            )
          }


          <div>
            <label >Primera<br />
              <div>Resultado de unidades totales menos faltantes y segundas</div>
            </label>
          </div>

          <h2>Cobros</h2>
          <div className="containerTwoInputs">
            <div>
              <label >Descripcion  <br /> <input type="text" name="fecha_auditoria" /></label>
            </div>
            <div>
              <label >Cantidad  <br /> <input type="text" name="fecha_auditoria" /></label>
            </div>
            <div>
              <label >Valor  <br /> <input type="text" name="fecha_auditoria" /></label>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default FormAuditoria
