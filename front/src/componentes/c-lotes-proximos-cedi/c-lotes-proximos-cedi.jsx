import { useSelector } from "react-redux"

import './c-lotes-proximos-cedi.css'

import LoteCedi from "../c-lote-cedi/c-lote-cedi"


const LotesProximosCedi = () => {

  const showLotes = useSelector(state => state.ShowLotes)

  const unDia = 86400000


  return (
    <div className="c-lotesActivos" >
      <div className='titleLotesProximos'>
        <h2>Entrega Probable Proximos 10 dias...</h2>
      </div>
      <div className="containerAllLotes">
        {
          showLotes && showLotes.map((e, i) =>
            new Date(e.fecha_probable_entrega).getTime() > Date.now() - unDia &&
            new Date(e.fecha_probable_entrega).getTime() < Date.now() + unDia * 10 &&
            <LoteCedi key={i} showLote={e} index={i} />
          )
        }
      </div>
    </div>
  )
}

export default LotesProximosCedi
