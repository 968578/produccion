import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"


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

import './c-grafico-dias-carga.css'

const GraficoDiasCarga = () => {

  const [confeccionistas, setConfeccionistas] = useState([])
  const [dataChart, setDataChart] = useState('')
  const refChart = useRef(null)
  const lotes = useSelector(state => state.AllLotes)


  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAdmin')
    axios.get(`${process.env.REACT_APP_API_URL}/confeccionistas/get`, {
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setConfeccionistas([...r.data.results])
      })
  }, [])


  useEffect(() => {
    if (confeccionistas.length && lotes.length) {
      const datafilter = lotes.filter((e) => e.capacidad !== "" && e.eficiencia !== "" && e.estado !== 'Corte'
        && e.estado !== 'Lote Integracion' && e.estado !== 'Para Asignar' && e.estado !== 'Liberado')
      let valueConfeccionistas = [...confeccionistas]

      for (let i = 0; i < valueConfeccionistas.length; i++) {
        const lotes_confeccionista = datafilter.filter(e => e.confeccionista === valueConfeccionistas[i].nombre)
        valueConfeccionistas[i].lotes = lotes_confeccionista

        const cargaTotal = lotes_confeccionista.reduce((acc, e) => {
          const totalMin = Number(e.sam) * Number(e.unidades)
          const eficiencia = e.eficiencia.slice(0, -1)
          const totalCapacidad = Number(e.capacidad) * 480 * (Number(eficiencia) / 100)
          const carga = totalMin / totalCapacidad
          acc += carga
          return acc
        }, 0)

        valueConfeccionistas[i].cargaTotal = cargaTotal.toFixed(2)
      }

      valueConfeccionistas.sort((a, b) => {
        return a.cargaTotal - b.cargaTotal
      })
      setDataChart({
        labels: valueConfeccionistas.map(e => `${e.nombre} (${e.cargaTotal})`),
        datasets: [{
          label: '',
          backgroundColor: ['#70a1ff'],
          data: valueConfeccionistas.map(e => e.cargaTotal),
          backgroundColor: ctx => {
            return Number(ctx.raw) > 8 ? '#c0392b' : '#70a1ff'
          }
        }]
      })
    }
  }, [confeccionistas, lotes])



  const opciones = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Dias de carga',
        font: {
          size: 25,

        },
        color: '#ecf0f1',
      },
      tooltip: {
        color: '#ecf0f1',
        
      },


    },
    scales: {
      x: {
        grid: {
          color:'#7f8c8d'
          
        },
        ticks: {
          color: '#ecf0f1',
          font: {
            size: 15
          },
        },
        stacked: true
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
        },
        stacked: true
      }
    },
  }

  return (
    <div>
      {
        dataChart !== '' &&
        <div className="c-reporteDiasCarga">
          <div className="reporteDiasCaraga">
            <Bar ref={refChart} data={dataChart} options={opciones} />

          </div>
        </div>
      }
    </div>
  )
}

export default GraficoDiasCarga
