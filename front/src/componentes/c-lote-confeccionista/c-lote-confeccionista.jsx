import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

import './c-lote-confeccionista.css'


const variantsInconMaquina = {
  hidden: {
    opacity: 0

  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      repeat: Infinity,

    }
  }
}

const variantsLote = {
  hidden: {
    opacity: 0
  },
  show: i => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: (i + 1) * 0.1
    }
  })
}


const LoteConfeccionista = (props) => {


  return (

    <div>
      {
        props.data &&
        <Link to={'/details-confeccionista/' + props.data.op}>
          <motion.div custom={props.index} initial='hidden' animate='show' variants={variantsLote} whileHover={{ scale: 0.96 }} className="containerLoteDestacado">

            <div className="containerDuo">
              <div className='loteTitle'>OP:</div>
              <div className='loteValue'>{props.data.op}</div>
            </div>

            <div className="containerDuo" >
              <div className='loteTitle'>Referencia:</div>
              <div className='loteValue'>{props.data.referencia}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Confeccionista</div>
              <div className='loteValue'>{props.data.confeccionista}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Estado</div>
              <div className='loteValue'>{props.data.estado}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Tipo Producto:</div>
              <div className='loteValue'>{props.data.tipo_producto}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Fecha de Entrega:</div>
              <div className='loteValue'>{props.data.fecha_probable_entrega}</div>
            </div>

            <div className="containerDuo">
              <div className='loteTitle'>Unidades Terminadas</div>
              <div className='barraBase'>
                <div className='barra100'>
                  <div style={{
                    width: `${(props.data.unidades_terminadas / props.data.unidades) * 100}%`,
                    backgroundColor: '#2980b9', height: '100%', borderRadius: '15px',
                    maxWidth: '100%'
                  }}>

                  </div>
                </div>
              </div>
              <div className='loteValue'>{`${Math.floor((props.data.unidades_terminadas / props.data.unidades) * 100)}`}%</div>
            </div>

            <div className="containerDuo">
              {
                props.data.estado === 'Confeccion' &&
                <div  >

                  <motion.svg className='svgMaquina' initial='hidden' animate='show' variants={variantsInconMaquina} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920">
                    <path className="st0" d="M836.5 1230.8H217v233.1c0 40.8 33 73.8 73.8 73.8h1269.1c40.8 0 73.8-33 73.8-73.8v-233.1H836.5z" id="Layer_2" />
                    <path className="st0" d="M1397.5 772.1c48.4 0 87.7-39.2 87.7-87.7s-39.2-87.7-87.7-87.7c-48.4 0-87.7 39.2-87.7 87.7s39.3 87.7 87.7 87.7zm0 100.3c-68.6 0-124.2 55.6-124.2 124.2s55.6 124.2 124.2 124.2 124.2-55.6 124.2-124.2-55.6-124.2-124.2-124.2z" id="Layer_5" />
                    <path className="st0" d="M1661.8 582.8h-28.1v-27.4c0-34.9-28.3-63.2-63.2-63.2h-84.9V382.4h-56.2v109.8H407.7c-36 0-65.1 29.2-65.1 65.1v233.2l21 146.6h307.1l74.9-146.6h415.7v440.2h472.3V811.3h28.1c22.7 0 41-18.4 41-41V623.9c.2-22.7-18.2-41.1-40.9-41.1zm-264.3 14c48.4 0 87.6 39.2 87.6 87.7 0 48.4-39.2 87.7-87.6 87.7-48.4 0-87.7-39.2-87.7-87.7.1-48.4 39.3-87.7 87.7-87.7zm0 524c-68.6 0-124.2-55.6-124.2-124.2s55.6-124.1 124.2-124.1 124.1 55.6 124.1 124.1-55.5 124.2-124.1 124.2z" id="Layer_7" />
                    <g id="STROKES">
                      <path className="st1" d="M1161.4 492.2H407.7c-36 0-65.1 29.2-65.1 65.1v233.2l21 146.6h307.2l74.9-146.6h415.7v440.2H216.9v233c0 40.8 33 73.8 73.8 73.8h1269.1c40.8 0 73.8-33 73.8-73.8V555.4c0-34.9-28.3-63.2-63.2-63.2h-409z" />
                      <path className="st1" d="M1661.8 811.3h-28.1V582.8h28.1c22.7 0 41.1 18.4 41.1 41.1v146.4c0 22.7-18.4 41-41.1 41z" />
                      <path className="st1" d="M1429.4 382.4h56.2v109.8h-56.2z" />
                      <path className="st1" d="M655.9 492.2v445" />
                      <circle className="st1" cx="1397.5" cy="684.5" r="87.7" />
                      <circle className="st1" cx="1397.5" cy="996.6" r="124.2" />
                      <path className="st1" d="M1078.3 1230.8h555.4" />
                      <path className="st1" d="M216.9 1463.8h619.6v-233" />
                      <path className="st1" d="M554.6 937.2v183.6" />
                      <path className="st1" d="M342.6 790.6h313.3" />
                    </g>
                  </motion.svg>
                </div>

              }
              {
                props.data.estado === 'Paro' &&
                <div >
                  <svg className='svgParo' enableBackground='new 0 0 64 64' viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" fill="#4f5d73" r="32" />
                    <path d="m26.3 55c-1.6 0-4-1-5.1-2.1l-8.1-8.1c-1.1-1.1-2.1-3.5-2.1-5.1v-11.4c0-1.6 1-4 2.1-5.1l8.1-8.1c1.2-1.2 3.5-2.1 5.1-2.1h11.4c1.7 0 4 1 5.1 2.1l8.1 8.1c1.2 1.2 2.1 3.5 2.1 5.1v11.4c0 1.7-1 4-2.1 5.1l-8.1 8.1c-1.1 1.1-3.5 2.1-5.1 2.1z" fill="#231f20" opacity=".2" />
                    <path d="m26.3 53c-1.6 0-4-1-5.1-2.1l-8.1-8.1c-1.1-1.1-2.1-3.5-2.1-5.1v-11.4c0-1.6 1-4 2.1-5.1l8.1-8.1c1.2-1.2 3.5-2.1 5.1-2.1h11.4c1.7 0 4 1 5.1 2.1l8.1 8.1c1.2 1.2 2.1 3.5 2.1 5.1v11.4c0 1.7-1 4-2.1 5.1l-8.1 8.1c-1.1 1.1-3.5 2.1-5.1 2.1z" fill="#c75c5c" />
                    <path d="m45 34c0 2.2-1.8 4-4 4h-18c-2.2 0-4-1.8-4-4v-4c0-2.2 1.8-4 4-4h18c2.2 0 4 1.8 4 4z" fill="#fff" />
                  </svg>
                </div>
              }
              {
                props.data.estado === 'Lavanderia' &&
                <div >
                  <motion.svg className='svgLavanderia' initial='hidden' animate='show' variants={variantsInconMaquina} viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <path d="m53.9081 63.031h-35.8991c-.5523 0-1-.4477-1-1v-48.9635c0-.5523.4477-1 1-1h35.8991c.5523 0 1 .4477 1 1v48.9635c0 .5523-.4477 1-1 1z" fill="#d0cfce" />
                    <circle cx="36.0239" cy="45.0155" fill="#fff" r="12" />
                    <path d="m24.0239 45.0155c0 6.6274 5.3726 12 12 12s12-5.3726 12-12" fill="#92d3f5" />
                    <path d="m17 17.0086h16v9.9501h-16z" fill="#9b9b9a" />
                    <circle cx="36.0239" cy="45.0155" fill="#d0cfce" r="7" />
                    <path d="m29.0239 45.0155c0 3.866 3.134 7 7 7s7-3.134 7-7" fill="#61b2e4" />
                    <g fill="none" stroke="#000" strokeMiterlimit='10' strokeWidth='2' >
                      <circle cx="36.0239" cy="45.0155" r="12" />
                      <circle cx="36.0239" cy="45.0155" r="7" />
                      <path d="m53.9081 63.031h-35.8991c-.5523 0-1-.4477-1-1v-48.9635c0-.5523.4477-1 1-1h35.8991c.5523 0 1 .4477 1 1v48.9635c0 .5523-.4477 1-1 1z" strokeLinecap='round' strokeLinejoin='round' />
                      <path d="m17 17.0086h16v9.9501h-16z" strokeLinecap='round' strokeLinejoin='round' />
                      <path d="m37 19h7" strokeLinecap='round' strokeLinejoin='round' />
                      <path d="m37 23h7" strokeLinecap='round' strokeLinejoin='round' />
                      <path d="m23 21h4" strokeLinecap='round' strokeLinejoin='round' />
                    </g>
                    <circle cx="49" cy="21" r="2" />
                  </motion.svg>
                </div>
              }

            </div>

          </motion.div>
        </Link>
      }



    </div>
  )
}

export default LoteConfeccionista
