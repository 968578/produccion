import axios from 'axios'
import { motion } from 'framer-motion'
import { useState } from 'react'

import './c-lote-inactivo.css'



const variantsLote={
  hidden:{
    opacity:0
  },
  show:i =>({
    opacity:1,
    transition:{
      duration:0.5,
      delay: (i+1) *0.1
    }
  })
}

const variantsConfirmActive={
  hidden: {
    scale: 0
  },
  show: {
    scale: 1,

  }
}

const LoteInactivo = (props) => {

  const [confirmActiveLote, setConfirmActiveLote] = useState('')
  
  const ActivarLote=()=>{
    const op = {
      op:props.showLote.op
    }
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.put(`${process.env.REACT_APP_API_URL}/lotes/update-activar-lote`,op,{
      headers: {
        'authorization': 'Barrer ' + token,
      }
      
    })
    .then(r =>{
      if(r.data.msj ==='Lote Activado'){
        setConfirmActiveLote(r.data.msj)
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }
    } )
  }


  return (
    <div>
      {
        props.showLote &&
          <motion.div custom={props.index} initial='hidden' animate='show' variants={variantsLote} className="containerLoteDestacado">

          <div onClick={ActivarLote}  className='c-btnactivarLote'>
            <div>Activar</div>
          </div>

            <div className="containerDuo">
              <div className='loteTitle'>OP:</div>
              <div className='loteValue'>{props.showLote.op}</div>
            </div>

            <div className="containerDuo" >
              <div className='loteTitle'>Referencia:</div>
              <div className='loteValue'>{props.showLote.referencia}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Confeccionista</div>
              <div className='loteValue'>{props.showLote.confeccionista}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Estado</div>
              <div className='loteValue'>{props.showLote.estado}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Tipo Producto:</div>
              <div className='loteValue'>{props.showLote.tipo_producto}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Fecha de Entrega:</div>
              <div className='loteValue'>{props.showLote.fecha_probable_entrega}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Unidades Terminadas</div>
              <div className='barraBase'>
                <div className='barra100'>
                  <div style={{
                    width: `${(props.showLote.unidades_terminadas / props.showLote.unidades) * 100}%`,
                    backgroundColor: '#2980b9', height: '100%', borderRadius: '15px',
                    maxWidth: '100%'
                  }}>

                  </div>
                </div>
              </div>
              <div className='loteValue'>{`${Math.floor((props.showLote.unidades_terminadas / props.showLote.unidades) * 100)}`}%</div>
            </div>

            <div className="containerDuo">
              {
                confirmActiveLote !== '' && 
              <motion.div initial='hidden' animate='show' variants={variantsConfirmActive} className='loteValue confirmActiveLote'>{confirmActiveLote}</motion.div>
              }
            </div>



          </motion.div>
      }

    </div>
  )
}

export default LoteInactivo
