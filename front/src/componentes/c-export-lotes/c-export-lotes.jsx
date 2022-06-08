import { useRef, useState } from "react"

import { utils, writeFile } from 'xlsx/xlsx.mjs';
import { differenceInCalendarDays } from 'date-fns'

import axios from 'axios'


const ExportLotes = (props) => {

  const [input, setInput] = useState({
    criterio: '',
    fecha_inicial: '',
    fecha_final: ''
  })

  const [errors, setErrors] = useState('')
  const [activeButton, setActiveButton] = useState(false)

  const refFecha_inicial = useRef(null)
  const refFecha_final = useRef(null)


  const changeInput = (e) => {
    const values = { ...input }
    
    if (e.target.name === 'fecha_inicial') {

      if (values.fecha_final !== '') {
        if (new Date(e.target.value).getTime() > new Date(values.fecha_final).getTime()) {
          refFecha_inicial.current.value =''
          setInput({...input, fecha_inicial:''})
          setActiveButton(false)
          return setErrors('Fecha Inicial debe ser menor')
        }else{
          setInput({ ...input, [e.target.name]: e.target.value })
          setActiveButton(true)
          return setErrors('')
        }
      }else{
        return setInput({ ...input, [e.target.name]: e.target.value })
      }
    } else if (e.target.name === 'fecha_final') {
      
      if (values.fecha_inicial !== '') {
        if (new Date(e.target.value).getTime() < new Date(values.fecha_inicial).getTime()) {
          refFecha_final.current.value=''
          setInput({...input, fecha_final:''})
          setActiveButton(false)
          return setErrors('Fecha Inicial debe ser menor')
        }else{
          setInput({ ...input, [e.target.name]: e.target.value })
          setActiveButton(true)
          return setErrors('')
        }
      }
    } 

    setInput({ ...input, [e.target.name]: e.target.value })

  }


  const changeCriterio=(e)=>{
    if(e.target.value === 'Todo'){
      setErrors('')
      setActiveButton(true)
      setInput({[e.target.name]:e.target.value})
    }else if(e.target.value === 'Rango de fechas'){

      setInput({[e.target.name]:e.target.value,
        fecha_inicial: '',
        fecha_final: ''
    })
      setActiveButton(false)

    }else{
      setErrors('')
      setActiveButton(false)
      setInput({
        criterio: '',
        fecha_inicial: '',
        fecha_final: ''
      })
    }
  }

  const submitInput = (e) => {
    if(!activeButton){
      return
    }
    e.preventDefault()
    if (input.criterio === 'Todo' || input.criterio === 'Rango de fechas') {
      const token = window.localStorage.getItem('accessTokenAuditoria')
      axios.get(`${process.env.REACT_APP_API_URL}/lotes/get-export`, {
        params: input,
        headers: {
          'authorization': 'Barrer ' + token
        }
      })
        .then(r => {
          if (r.data.length > 0) {
            
            for(let i = 0; i < r.data.length; i++){
                r.data[i].ciclo_Recepcion = 0
                r.data[i].ciclo_Preparacion = 0
                r.data[i].ciclo_Confeccion = 0
                r.data[i].ciclo_Lavanderia = 0
                r.data[i].ciclo_Terminacion = 0
                for(let j =0 ; j < r.data[i].ciclo.length; j++){
                  
                  r.data[i][`ciclo_${r.data[i].ciclo[j].tipo}`] = differenceInCalendarDays((r.data[i].ciclo[j].fecha_final !== null ?
                    new Date(r.data[i].ciclo[j].fecha_final).setMinutes(300) : Date.now()), 
                    new Date(r.data[i].ciclo[j].fecha_inicio).setMinutes(300) )
                }
                delete r.data[i].ciclo
              
            }

            if (input.criterio === 'Todo') {
              const wb = utils.book_new()
              const ws = utils.json_to_sheet(r.data)
              utils.book_append_sheet(wb, ws, 'TablaPrincipal')
              writeFile(wb, 'Lotes-totales.xlsx')

            } else if (input.criterio === 'Rango de fechas') {
              // const wb = utils.book_new()
              // const ws = utils.json_to_sheet(r.data)
              // utils.book_append_sheet(wb, ws, 'TablaPrincipal')
              // writeFile(wb, `Lotes-desde:${input.fecha_inicial}-hasta:${input.fecha_final}.xlsx`)
            }
          }
        })
    }

  }

  
  return (
    <div>
      {
        props.active &&
      <form className="formExportAuditorias" >
        <label >Criterio: </label>
        <select name="criterio" onChange={changeCriterio} >
          <option value="">Escoge Criterio</option>
          <option value="Todo">Todo</option>
          <option value="Rango de fechas">Rango de fechas</option>
        </select>
        {
          input.criterio === 'Rango de fechas' &&
          <div className="c-rangeDate">
            <div>
              <label >Desde:</label>
              <input ref={refFecha_inicial} type="date" name="fecha_inicial" onChange={changeInput} />
            </div>
            <div>
              <label >Hasta:</label>
              <input ref={refFecha_final} type="date" name="fecha_final" onChange={changeInput} />
            </div>
          </div>
        }
        {
          errors !== '' &&
          <div>{errors}</div>
        }

        <div className={activeButton ? 'activeBTN-export' : 'desactiveBTN-export'} onClick={submitInput}>Exportar</div>
      </form>
      }
    </div>
  )
}

export default ExportLotes
