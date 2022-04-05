import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import FormAuditoria from "../../componentes/form-auditoria/form-auditoria"



import {
  loadAllLotes,
  loadShowLotes
} from "../../redux/actions/actions"

const DetailsLoteAuditoria = () => {

  const params = useParams()

  const [dataLocal, setDataLocal] = useState('')
  const [confirmDelete, setconfirmDelete] = useState('')
  const [activeEdit, setActiveEdit] = useState(false)


  useEffect(() => {
    axios.get('http://localhost:3000/get-lotes')
      .then(r => {
        // dispatch(loadAllLotes(r.data))
        // dispatch(loadShowLotes(r.data))
        setDataLocal(...r.data.filter((e) => e.op === params.op))
      })

  }, [])


  const AuditarLote = () => {
    setActiveEdit(!activeEdit)
  }



  return (
    <div>
      <div className='containerHomeButton'>
        <Link to='/Home-Auditoria' className='HomeFormLote'>Home</Link>
      </div>

      <div className="containerDetails">

        <div className="EditarEliminar">
          <div onClick={AuditarLote} className="containerEditar">
            <div >Auditar</div>
            <div className="L"></div>
          </div>
        </div>

        <div className="detailDuoTitle">
          <div>OP</div>
          <div>{dataLocal.op}</div>
        </div>

        <div className="containerAllDetails">
          <div className="containerStart">

            <div className="detailDuo">
              <div>Fecha de Asignacion</div>
              <div>{dataLocal.fecha_asignacion}</div>
            </div>

            <div className="detailDuo">
              <div>Fecha de Entrega</div>
              <div>{dataLocal.fecha_entrega}</div>
            </div>

            <div className="detailDuo">
              <div>Fecha Probable de Entrega</div>
              <div>{dataLocal.fecha_probable_entrega}</div>
            </div>

            <div className="detailDuo">
              <div>Tipo Producto</div>
              <div>{dataLocal.tipo_producto}</div>
            </div>

            <div className="detailDuo">
              <div>Unidades</div>
              <div>{dataLocal.unidades}</div>
            </div>

            <div className="detailDuo">
              <div>Valor Unidad</div>
              <div>{new Intl.NumberFormat().format(dataLocal.valor_unidad)}$</div>
            </div>

            <div className="detailDuo">
              <div>Valor Total</div>
              <div>{new Intl.NumberFormat().format(dataLocal.unidades * dataLocal.valor_unidad)}$</div>
            </div>

          </div>

          <div className="containerMedio">
            <div className="detailDuo">
              <div>Confeccionista</div>
              <div>{dataLocal.confeccionista}</div>
            </div>

            <div className="detailDuo">
              <div>Estado</div>
              <div>{dataLocal.estado}</div>
            </div>

            <div className="detailDuo">
              <div>Auditado</div>
              <div>{dataLocal.auditado == true ? 'Si' : 'No'}</div>
            </div>

            <div className="detailDuo">
              <div>Referencia</div>
              <div>{dataLocal.referencia}</div>
            </div>

            <div className="detailDuo">
              <div>Tejido</div>
              <div>{dataLocal.tejido}</div>
            </div>

            <div className="detailDuo">
              <div>Zona</div>
              <div>{dataLocal.zona}</div>
            </div>

          </div>

          <div className="containerEnd">
            <div className="detailDuo">
              <div>Capacidad</div>
              <div>{dataLocal.capacidad}</div>
            </div>

            <div className="detailDuo">
              <div>Ciclo</div>
              <div>{dataLocal.ciclo}</div>
            </div>

            <div className="detailDuo">
              <div>Modulo</div>
              <div>{dataLocal.modulo}</div>
            </div>

            <div className="detailDuo">
              <div>Eficiencia</div>
              <div>{dataLocal.eficiencia}</div>
            </div>

            <div className="detailDuo">
              <div>Sam</div>
              <div>{dataLocal.sam}</div>
            </div>

            <div className="detailDuo">
              <div>Sam total</div>
              <div>{dataLocal ? Number(dataLocal.sam) * Number(dataLocal.unidades) : ''}</div>
            </div>

          </div>

          <div className="detailDuo">
            <div>Observacion</div>
            <div>{dataLocal.observacion}</div>
          </div>

        </div>

      </div>
      {
        confirmDelete && <p className="confirmEliminado">{confirmDelete}</p>
      }
      <FormAuditoria/>
    </div>
  )
}

export default DetailsLoteAuditoria
