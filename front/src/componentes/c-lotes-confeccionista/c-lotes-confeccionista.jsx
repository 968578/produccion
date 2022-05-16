import './c-lotes-confeccionista.css'

import LoteConfeccionista from "../c-lote-confeccionista/c-lote-confeccionista"


const LotesConfeccionista = (props) => {


  return (
    <div className="c-lotesActivos">
      <div className="c-titleTusLotes">
        <h2>Tus Lotes</h2>
      </div>
      <div className="containerAllLotes">
        {
          props?.lotes.length > 0 && props.lotes.map((e, i) =>

            <LoteConfeccionista key={i} data={e} index={i} />
          )
        }
      </div>

    </div>
  )
}

export default LotesConfeccionista