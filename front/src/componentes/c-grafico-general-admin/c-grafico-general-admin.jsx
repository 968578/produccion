import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

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

import './c-grafico-general-admin.css'

const GraficoGeneral = () => {

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

  const [dataChart, setDataChart] = useState('')
  const [dataAllLotes, setDataAllLotes] = useState([])
  const [showLotes, setShowLotes] = useState([])
  const [confeccionistas, setConfeccionistas] = useState([])

  const BarRef = useRef(null)
  const refConfeccionistas = useRef(null)

  const lotes = useSelector(state => state.AllLotes)

  const changeConfeccionista = (e) => {

    if (e.target.value === 'Reporte General') {
      return setShowLotes(dataAllLotes)
    }

    const confeccionista = e.target.value
    setShowLotes(dataAllLotes.filter((e) => e.confeccionista === confeccionista))

  }

  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.get(`${process.env.REACT_APP_API_URL}/confeccionistas/get`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {

        setConfeccionistas(r.data.results.map((e) => e.nombre))
      })
  }, [])

  useEffect(() => {
    if (lotes.length) {
      setDataAllLotes(lotes)
      setShowLotes(lotes)
    }
  }, [lotes])

  useEffect(() => {


    if (showLotes.length > 0) {

      setCountLotesCorte(showLotes.reduce((acc, e) => {
        if (e.estado === 'Corte') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLoteIntegracion(showLotes.reduce((acc, e) => {
        if (e.estado === 'Lote Integracion') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLoteParaAsignar(showLotes.reduce((acc, e) => {
        if (e.estado === 'Para Asignar') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLoteRecepcion(showLotes.reduce((acc, e) => {
        if (e.estado === 'Recepcion') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLotesPreparacion(showLotes.reduce((acc, e) => {
        if (e.estado === 'Preparacion') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLotesConfeccion(showLotes.reduce((acc, e) => {
        if (e.estado === 'Confeccion') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLotesLavanderia(showLotes.reduce((acc, e) => {
        if (e.estado === 'Lavanderia') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLotesTerminacion(showLotes.reduce((acc, e) => {
        if (e.estado === 'Terminacion') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLotesLiberacion(showLotes.reduce((acc, e) => {
        if (e.estado === 'Liberado') {
          acc += 1
        }
        return acc
      }, 0))

      setCountLotesParo(showLotes.reduce((acc, e) => {
        if (e.estado === 'Paro') {
          acc += 1
        }
        return acc
      }, 0))

      setCountAllLotes(showLotes.length)
    }
    else if (showLotes.length === 0) {
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

  }, [showLotes])

  useEffect(() => {
    if (showLotes.length > -1) {
      setDataChart({
        labels: [`Corte`, `Integracion`, `Para Asignar`, `Recepcion`, `Preparacion`, `Confeccion`, `Lavanderia`,
          `Terminacion`, `Liberado`, `Paro`],
        datasets: [{
          label: 'Lotes',
          backgroundColor: ['#747d8c', '#43919B', '#f8a5c2', '#ff793f', '#F8EFBA', '#27ae60',
            '#5f27cd', '#f1c40f', '#3498db', '#c0392b'],
          data: [countLotesCorte, countLoteIntegracion, countLoteParaAsignar, countLoteRecepcion, countLotesPreparacion,
            countLotesConfeccion, countLotesLavanderia, countLotesTerminacion, countLotesLiberacion, countLotesParo]
        }]
      })
    }
  }, [countLotesCorte, countLoteIntegracion, countLoteParaAsignar, countLoteRecepcion, countLotesPreparacion,
    countLotesConfeccion, countLotesLavanderia, countLotesTerminacion, countLotesLiberacion, countLotesParo, countAllLotes])


  const opciones = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
      },

    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#ecf0f1',
          font: {
            size: 14
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#ecf0f1',
          font: {
            size: 14
          }
        }
      }
    },


  }
  console.log(showLotes)

  return (
    <div >
      <select name="confeccionistas" ref={refConfeccionistas} onChange={changeConfeccionista} className='SelectConfeccionista' >
        <option value="Reporte General">Reporte General</option>
        {
          confeccionistas.length > 0 && confeccionistas.map((e, i) =>
            <option value={e} key={i}>{e}</option>
          )
        }
      </select>
      {
        dataChart !== '' &&
        <div className="c-reporte">
          <div className="chartGeneral">
            <Bar ref={BarRef} data={dataChart} options={opciones} />

          </div>
          <div className="c-namesOp">
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Corte' &&
                <div key={i} className='colorDefault'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Lote Integracion' &&
                <div key={i} className='colorIntegracion'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Para Asignar' &&
                <div key={i} className='colorParaAsignar'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Recepcion' &&
                <div key={i} className='colorRecepcion'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Preparacion' &&
                <div key={i} className='colorPreparacion'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Confeccion' &&
                <div key={i} className='colorConfe'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Lavanderia' &&
                <div key={i} className='colorLavanderia'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Terminacion' &&
                <div key={i} className='colorTerminacion'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Liberado' &&
                <div key={i} className='colorLiberado'>
                  <Link to={'/details-admin/' + e.op}>
                    {e.op}
                  </Link>
                </div>
              )
            }
            {
              showLotes.length && showLotes.map((e, i) =>
                e.estado === 'Paro' &&
                <div key={i} className='colorParo'>
                  <Link to={'/details-admin/' + e.op}>
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

export default GraficoGeneral
