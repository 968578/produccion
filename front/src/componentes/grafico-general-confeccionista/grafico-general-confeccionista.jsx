import { useEffect, useRef, useState } from "react"

import { Link } from "react-router-dom"

import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  } from 'chart.js'


  
  import { Bar } from 'react-chartjs-2'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    
    );
    
import './grafico-general-confeccionista.css'

const GraficoGeneralConfeccionista=(props)=>{

  const [countLotesCorte, setCountLotesCorte] = useState(0)
  const [countLoteIntegracion, setCountLoteIntegracion] = useState(0)
  const [countLoteParaAsignar, setCountLoteParaAsignar] = useState(0)
  const [countLoteRecepcion, setCountLoteRecepcion] = useState(0)
  const [countLotesPreparacion, setCountLotesPreparacion] = useState(0)
  const [countLotesConfeccion, setCountLotesConfeccion] = useState(0)
  const [countLotesLavanderia, setCountLotesLavanderia] = useState(0)
  const [countLotesTerminacion, setCountLotesTerminacion] = useState(0)
  const [countLotesLiberacion, setCountLotesLiberacion] = useState(0)
  const [countLotesParo, setCountLotesParo] = useState(0)
  const [countAllLotes, setCountAllLotes] = useState(0)

  const[dataChart, setDataChart] = useState('')

  const BarRef = useRef(null)


  useEffect(()=>{
    
    if(props.lotes.length > 0){
      
      setCountLotesCorte(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Corte'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLoteIntegracion(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Lote Integracion'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLoteParaAsignar(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Para Asignar'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLoteRecepcion(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Recepcion'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLotesPreparacion(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Preparacion'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLotesConfeccion(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Confeccion'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLotesLavanderia(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Lavanderia'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLotesTerminacion(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Terminacion'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLotesLiberacion(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Liberado'){
          acc  += 1
        } 
        return acc
      },0))

      setCountLotesParo(props.lotes.reduce((acc, e)=>{ 
        if(e.estado === 'Paro'){
          acc  += 1
        } 
        return acc
      },0))

      setCountAllLotes(props.lotes.length)
    }
    else if(props.lotes.length === 0){
      console.log('si ejecuta')
      setCountLotesCorte(0)
      setCountLoteIntegracion(0)
      setCountLoteParaAsignar(0)
      setCountLoteRecepcion(0)
      setCountLotesPreparacion(0)
      setCountLotesConfeccion(0)
      setCountLotesLavanderia(0)
      setCountLotesTerminacion(0)
      setCountLotesLiberacion(0)
      setCountLotesParo(0)
      setCountAllLotes(0)
    }
    
  },[props.lotes])

  useEffect(()=>{
    if(props.lotes.length > -1){
      setDataChart({
        labels:['Corte', 'Integracion', 'Para Asignar', 'Recepcion','Preparacion', 'Confeccion', 'Lavanderia', 'Terminacion', 
                'Liberado', 'Paro'],
        datasets:[{
          label:'Lotes',
          backgroundColor:['#747d8c','#43919B', '#f8a5c2', '#ff793f', '#F8EFBA', '#27ae60' ,
                            '#5f27cd', '#f1c40f', '#3498db', '#c0392b'],
          data:[countLotesCorte, countLoteIntegracion, countLoteParaAsignar, countLoteRecepcion, countLotesPreparacion,
            countLotesConfeccion, countLotesLavanderia, countLotesTerminacion,countLotesLiberacion, countLotesParo]
        }]
      })
    }
  },[countLotesCorte, countLoteIntegracion, countLoteParaAsignar, countLoteRecepcion, countLotesPreparacion,
  countLotesConfeccion, countLotesLavanderia, countLotesTerminacion,countLotesLiberacion, countLotesParo, countAllLotes])

  
  const opciones={
    responsive:true,
    maintainAspectRatio:true,
    plugins:{
      legend:{
        display:false,
      },
      tooltip:{
      },
      
    },
    scales:{
      x:{
        grid:{
          display : false
        },
        ticks:{
          color:'#ecf0f1',
          font:{
            size:13
          }
        }
      },
      y:{
        grid:{
          display:false
        },
        ticks:{
          color:'#ecf0f1',
          font:{
            size:14
          }
        }
      }
    },
    
    
  }

  return(
    <div >

      {
        dataChart !=='' &&
        <div className="c-reporte">
          <div className="chartGeneral">
            <Bar ref={BarRef} data ={dataChart} options={opciones}   />
            
          </div>
          <div className="c-namesOp">
          {
            props.lotes.length && props.lotes.map((e,i)=>
            <div key={i} className={e.estado === 'Confeccion' ? 'colorConfe' : e.estado === 'Paro' ? 'colorParo' :  
            e.estado === 'Lavanderia' ? 'colorLavanderia' : e.estado === 'Terminacion' ? 'colorTerminacion' : 
            e.estado === 'Liberado' ? 'colorLiberado' : e.estado=== 'Recepcion' ? 'colorRecepcion' : 
            e.estado === 'Preparacion' ? 'colorPreparacion' : e.estado === 'Para Asignar' ? 'colorParaAsignar' :
            e.estado === 'Lote Integracion' ? 'colorIntegracion':
                            'colorDefault'}>
              <Link to={'/details-confeccionista/' + e.op}>
                {e.op}
              </Link>
            </div>
            
            )
          }
          </div>
        </div>

      }

    </div>
  )
}

export default GraficoGeneralConfeccionista
