import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";
import { differenceInCalendarDays } from 'date-fns'

import AuditoriaDetails from "../c-details-auditoria/c-details-auditoria";


const ComponentDetailsLoteAuditoria = (props) => {
  const params = useParams();

  const [dataLocal, setDataLocal] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem('accessTokenAuditoria')
    const op = { op: params.op }
    axios.get(`${process.env.REACT_APP_API_URL}/lotes/op`, {
      params: op,
      headers: {
        'authorization': 'Barrer ' + token
      }
    })
      .then(r => {
        setDataLocal(r.data)
      })
  }, []);


  return (
    <div>
      <div className="containerHomeButton">
        <Link to="/home-auditoria" className="HomeFormLote">
          Home
        </Link>
      </div>

      <div className="containerDetails">
        <div className="EditarEliminar">
          <div onClick={props.activeAuditEvent} className="containerEditar">
            <div>Auditar</div>
            <div className="L"></div>
          </div>
        </div>

        <div >

          <div className="detailTitle">
            <div className="detailDuo">
              <div className="detailDuoHeaderTitle">OP</div>
              <div className="detailDuoHeaderValue">{dataLocal.op}</div>
            </div>
            <div className="detailDuo">
              <div className="detailDuoHeaderTitle">Referencia</div>
              <div className="detailDuoHeaderValue">{dataLocal.referencia}</div>
            </div>
            <div className="detailDuo">
              <div className="detailDuoHeaderTitle">Confeccionista</div>
              <div className="detailDuoHeaderValue">{dataLocal.confeccionista}</div>
            </div>
          </div>

          <div className="containerAllDetails">
            <div className="containerLeft">
              <div className="containerStart">

                <div className="detailDuo">
                  <div className="detailDuoTitle" >Fecha de Asignacion</div>
                  <div className="detailDuoValue">{dataLocal.fecha_asignacion}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Fecha de Entrega</div>
                  <div className="detailDuoValue">{dataLocal.fecha_entrega}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Fecha Probable de Entrega</div>
                  <div className="detailDuoValue">{dataLocal.fecha_probable_entrega}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Estado</div>
                  <div className="detailDuoValue">{dataLocal.estado}</div>
                </div>
              </div>


              <div className="containerStart">
                <div className="detailDuo">
                  <div className="detailDuoTitle">Tipo Producto</div>
                  <div className="detailDuoValue">{dataLocal.tipo_producto}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Unidades</div>
                  <div className="detailDuoValue">{dataLocal.unidades}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Valor unidad</div>
                  <div className="detailDuoValue">{new Intl.NumberFormat().format(dataLocal.valor_unidad)}$</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Valor Total</div>
                  <div className="detailDuoValue">{new Intl.NumberFormat().format(dataLocal.unidades * dataLocal.valor_unidad)}$</div>
                </div>
              </div>

              <div className="containerStart">
                <div className="detailDuo">
                  <div className="detailDuoTitle">Tejido</div>
                  <div className="detailDuoValue">{dataLocal.tejido}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Zona</div>
                  <div className="detailDuoValue">{dataLocal.zona}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Capacidad</div>
                  <div className="detailDuoValue">{dataLocal.capacidad}</div>
                </div>

                <div className="detailDuo">
                  <div className="detailDuoTitle">Ciclo</div>
                  <div className="detailDuoValue">
                    {
                      dataLocal.ciclo?.length === 1 ? dataLocal.ciclo[0].tipo === 'Confeccion' &&
                        differenceInCalendarDays((dataLocal.ciclo[0].fecha_final !== null ?
                          new Date(dataLocal.ciclo[0].fecha_final).setMinutes(300) :
                          Date.now()), new Date(dataLocal.ciclo[0].fecha_inicio).setMinutes(300))
                        : dataLocal.ciclo?.length === 2 ? differenceInCalendarDays(Date.now(),
                          new Date(dataLocal.ciclo[0].fecha_inicio).setMinutes(300))
                          : dataLocal.ciclo?.length === 3 ? differenceInCalendarDays((dataLocal.ciclo[2].fecha_final !== null ?
                            new Date(dataLocal.ciclo[2].fecha_final).setMinutes(300) : Date.now()),
                            new Date(dataLocal.ciclo[0].fecha_inicio).setMinutes(300))
                            : <div>-/-</div>
                    }
                  </div>
                </div>

              </div>
              {
                dataLocal.auditado == false ?
                  <div className="containerAuditoria">
                    <div className="noAuditado">No Ha sido auditado</div>
                  </div>
                  :
                  <div className="c-AuditoriaMayor">
                    <div className="titleSiAuditoria">Auditorias</div>
                    {
                      dataLocal.auditoria?.length > 0 && dataLocal.auditoria.map((e, i) =>
                        <AuditoriaDetails key={i} data={e} />
                      )

                    }


                  </div>
              }

            </div>

            <div className="containerRight">
              <div className="containerObservacion">
                <div className="detailDuoTitle">Obervacion</div>
                <div className="detailDuoValue">{dataLocal.observacion}</div>
              </div>

              <div className="detailDuo">
                <div className="detailDuoTitle">Unidades Terminadas</div>
                <div className='barraBase'>
                  <div className='barra100'>
                    <div style={{
                      width: `${(dataLocal.unidades_terminadas / dataLocal.unidades) * 100}%`
                      , backgroundColor: '#2980b9', height: '100%', borderRadius: '15px', maxWidth: '100%'
                    }}>

                    </div>
                  </div>
                </div>
                <div className="detailDuoValue">{`${Math.floor((dataLocal.unidades_terminadas / dataLocal.unidades) * 100)}`}%</div>
                <div className="detailDuoValue">{dataLocal.unidades_terminadas} de {dataLocal.unidades}</div>
              </div>

              <div>
                <div className="detailDuo">
                  <div className="detailDuoTitle">Sam</div>
                  <div className="detailDuoValue">{dataLocal.sam}</div>
                </div>
                <div className="detailDuo">
                  <div className="detailDuoTitle"> Sam total</div>
                  <div className="detailDuoValue">{dataLocal ? Number(dataLocal.sam) * Number(dataLocal.unidades) : ""}</div>
                </div>
              </div>

              <div>
                <div className="detailDuo">
                  <div className="detailDuoTitle">Eficiencia</div>
                  <div className="detailDuoValue">{dataLocal.eficiencia}</div>
                </div>
                <div className="detailDuo">
                  <div className="detailDuoTitle">Modulo</div>
                  <div className="detailDuoValue">{dataLocal.modulo}</div>
                </div>
              </div>

              <div className="detailDuo">
                <div className="detailDuoTitle">Ciclo Confeccion</div>
                <div className="detailDuoValue">
                  {
                    dataLocal.ciclo?.length ? dataLocal.ciclo[0].tipo === 'Confeccion' &&
                      differenceInCalendarDays((dataLocal.ciclo[0].fecha_final !== null ?
                        new Date(dataLocal.ciclo[0].fecha_final).setMinutes(300) :
                        Date.now()), new Date(dataLocal.ciclo[0].fecha_inicio).setMinutes(300))
                      : <div>-/-</div>
                  }
                </div>
              </div>

              <div>
                <div className="detailDuo">
                  <div className="detailDuoTitle">Ciclos Lavanderia</div>
                  <div className="detailDuoValue">
                    {
                      dataLocal.ciclo?.length > 1 ? dataLocal.ciclo[1].tipo === 'Lavanderia' &&
                        differenceInCalendarDays((dataLocal.ciclo[1].fecha_final !== null ?
                          new Date(dataLocal.ciclo[1].fecha_final).setMinutes(300) :
                          Date.now()), new Date(dataLocal.ciclo[1].fecha_inicio).setMinutes(300))
                        : <div>-/-</div>
                    }
                  </div>
                </div>
              </div>

              <div>
                <div className="detailDuo">
                  <div className="detailDuoTitle">Ciclos Terminacion</div>
                  <div className="detailDuoValue">
                    {
                      dataLocal.ciclo?.length > 2 ? dataLocal.ciclo[2].tipo === 'Terminacion' &&
                        differenceInCalendarDays((dataLocal.ciclo[2].fecha_final !== null ?
                          new Date(dataLocal.ciclo[2].fecha_final).setMinutes(300) :
                          Date.now()), new Date(dataLocal.ciclo[2].fecha_inicio).setMinutes(300))
                        : <div>-/-</div>
                    }
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentDetailsLoteAuditoria