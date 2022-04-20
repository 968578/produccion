import { Link } from 'react-router-dom'



const LoteAuditoria=(props)=>{
  

  return(
    <div>
      {
        props.showLote &&
        <Link to={'/Details-Auditoria/'+props.showLote.op}>
          <div  className="containerLoteDestacado">

            <div className="containerDuo">
              <div>OP:</div>
              <div>{props.showLote.op}</div>
            </div>

            <div className="containerDuo" >
              <div>Referencia:</div>
              <div>{props.showLote.referencia}</div>
            </div>

            <div className="containerDuo">
              <div>Confeccionista</div>
              <div>{props.showLote.confeccionista}</div>
            </div>

            <div className="containerDuo">
              <div>Estado</div>
              <div>{props.showLote.estado}</div>
            </div>

            <div className="containerDuo">
              <div>Tipo Producto:</div>
              <div>{props.showLote.tipo_producto}</div>
            </div>

            <div className="containerDuo">
              <div>Fecha de Entrega:</div>
              <div>{props.showLote.fecha_probable_entrega}</div>
            </div>

          </div>
        </Link>
      }
        
          
      
    </div>
  )
}

export default LoteAuditoria
