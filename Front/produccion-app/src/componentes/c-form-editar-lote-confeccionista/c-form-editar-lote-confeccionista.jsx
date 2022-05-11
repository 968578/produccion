import { useEffect, useState } from "react";

import axios from "axios";

import './c-form-editar-lote-confeccionista.css'


const EditarLoteConfeccionista = (props) => {

  const [input, setInput] = useState({
    estado: '',
    unidades_terminadas: '',
    fecha_probable_entrega: '',
    observacion: ''
  })

  const [confirmUpdateLote, setConfirmUpdateLote] = useState('')

  const submitInput = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('accessTokenConfeccionista')
    axios.put(`${process.env.REACT_APP_API_URL}/lotes/update-from-confeccionista`, input, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setConfirmUpdateLote(r.data)
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });

        setTimeout(() => {
          window.location.reload()
        }, 4000)
      })
  }

  const changeInput = (e) => {
    const { name, value } = e.target

    setInput({ ...input, [name]: value })
  }

  useEffect(() => {
    if (props.data) {
      setInput({
        ...input,
        op: props.data.op,
        estado: props.data.estado,
        unidades_terminadas: props.data.unidades_terminadas,
        fecha_probable_entrega: props.data.fecha_probable_entrega,
        observacion: props.data.observacion
      })
    }

  }, [props.data]);

  console.log(input)

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
    <div className="c-editLoteConfe">
      {
        props.active &&

        <div>
          <div className="titleEditLote">Editando Lote</div>
          <div className="opEditLote">{input.op}</div>
          <form >
            <div className="c-actualizarLote">
              <div className="c-dosInputs">
                <div className="inputSolo">
                  <label className="titleEditLoteConfe" >Estado:</label>
                  <select className='listEstado' defaultValue={input.estado} name='estado' onChange={changeInput} >
                    <option value="">Escoge Estado</option>
                    <option value="Recepcion">Recepcion</option>
                    <option value="Preparacion">Preparacion</option>
                    <option value="Confeccion">Confeccion</option>
                    <option value="Lavanderia">Lavanderia</option>
                    <option value="Terminacion">Terminacion</option>
                    <option value="Paro">Paro</option>
                  </select>
                </div>
                <div className="inputSolo">
                  <label className="titleEditLoteConfe">Unidades Terminadas:</label>
                  <input onChange={changeInput} defaultValue={input.unidades_terminadas} name='unidades_terminadas' type="text" />
                </div>
              </div>

              <div className="c-dosInputs">
                <div className="inputSolo">
                  <label className="titleEditLoteConfe">Fecha Probable de Entrega</label>
                  <input onChange={changeInput} defaultValue={input.fecha_probable_entrega} name='fecha_probable_entrega' type="date" />
                </div>
                <div className="inputSolo">
                  <label className="titleEditLoteConfe">Observacion</label>
                  <textarea onChange={changeInput} defaultValue={input.observacion} name="observacion" id=""></textarea>
                </div>
              </div>

              <div onClick={submitInput} className="b-updateLoteConfe">Actualizar</div>
            </div>
          </form>
        </div>
      }
      {
        confirmUpdateLote !== '' && <div className="ConfirmUpdateloteFromConfe">{confirmUpdateLote}</div>
      }
    </div>
  )
}

export default EditarLoteConfeccionista
