import axios from 'axios'
import { useState } from 'react'
import { useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import './c-lote-confeccionista.css'

const LoteConfeccionista=(props)=>{

  const [addObservacion, setObservacion] = useState(false)
  const [input, setInput] = useState({
    observacion:'',
    estado:'',
    op:props?.data.op

  })

  const changeAddObservacion =()=>{
    setObservacion(!addObservacion)
  }

  const changeInput=(e)=>{
    const {name, value}= e.target
    setInput({...input, [name]: value})
  }

  const submitForm =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/lotes/observacion', input)
    .then(r => {
      if(r.data === 'Estado Cambiado con exito'){
        window.location.href='/Home-Confeccionista'
      }
      console.log(r.data)
    })

    console.log(input)

  }
  return(
    <div>
      <Link to={`/details-confeccionista/${props.data.op}`}>
        <div className="c-loteConfeccionista">
          <div>
            <div>Op:</div>
            <div>{props.data.op}</div>
          </div>
          <div>
            <div>Referencia:</div>
            <div>{props.data.referencia}</div>
          </div>
          <div>
            <div>Estado:</div>
            <div>{props.data.estado}</div>
          </div>
          <div>
            <div>Auditado:</div>
            <div>{props.data.auditado ? 'Si': 'No'}</div>
          </div>
          <div>
            <div>Fecha de entrega:</div>
            <div>{props.data.fecha_entrega}</div>
          </div>
          <div>
            <div>Fecha Probable de entrega:</div>
            <div>{props.data.fecha_probable_entrega}</div>
          </div>
          <div>
            <div>Tipo Producto:</div>
            <div>{props.data.tipo_producto}</div>
          </div>
          <div>
            <div>Unidades:</div>
            <div>{props.data.unidades}</div>
          </div>
          <div>
            <div>Valor Unidad:</div>
            <div>{props.data.valor_unidad}</div>
          </div>
          <div>
            <div onClick={changeAddObservacion} className='c-cambiaEstado'>
              ... <div>Cambiar estado</div>
            </div>
          </div>
        </div>
      </Link>

      {
        addObservacion && 
        <div>
          <form onSubmit={submitForm}>
            <label htmlFor="">Agregar Observacion:</label>
            <textarea onChange={changeInput} type="text" name='observacion' />
            <label htmlFor="">Estado:</label>
            <select onChange={changeInput} id='listestado' name='estado'  >
                    <option value="">Escoge Estado</option>
                    <option value="Paro">Paro</option>
                    <option value="Recepcion">Recepcion</option>
                    <option value="Preparacion">Preparacion</option>
                    <option value="Confeccion">Confeccion</option>
                    <option value="Terminacion">Terminacion</option>
                    <option value="Liberado">Liberado</option>
            </select> 
            <br />
            <input type="submit" value='Enviar' />
          </form>
        </div>

      }
    </div>
  )
}

export default LoteConfeccionista