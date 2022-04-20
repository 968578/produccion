import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EditarLote from "../../componentes/form-editar-lote/form-editar-lote";
import "./details.css";

import { loadAllLotes, loadShowLotes } from "../../redux/actions/actions";

const DetailsLote = () => {
  const params = useParams();

  const [dataLocal, setDataLocal] = useState("");
  const [confirmDelete, setconfirmDelete] = useState("");
  const [activeEdit, setActiveEdit] = useState(false);

  useEffect(() => {
    // axios.get("http://localhost:3000/lotes/get").then((r) => {
    //   // dispatch(loadAllLotes(r.data))
    //   // dispatch(loadShowLotes(r.data))
    //   setDataLocal(...r.data.filter((e) => e.op === params.op));
    // });
    const op = { op: params.op }
    axios.get("http://localhost:3000/lotes/op", { params: op })
      .then(r => {
        console.log(r.data)
        setDataLocal(r.data)
      })
  }, []);

  const deleteLote = () => {
    const op = { op: dataLocal.op };
    axios
      .delete("http://localhost:3000/lotes/delete", { params: op })
      .then((r) => {
        if (r.data === "Eliminado con exito") {
          setconfirmDelete(r.data);

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      });
  };

  const editLote = () => {
    setActiveEdit(!activeEdit);
  };


  return (
    <div>
      <div className="containerHomeButton">
        <Link to="/home-admin" className="HomeFormLote">
          Home
        </Link>
      </div>

      <div className="containerDetails">
        <div className="EditarEliminar">
          <div onClick={editLote} className="containerEditar">
            <div>Editar</div>
            <div className="L"></div>
          </div>
          <div onClick={deleteLote} className="containerEliminar">
            <div>Eliminar</div>
            <div className="X"></div>
          </div>
        </div>

        <div >

          <div className="detailTitle">
            <div className="detailDuo">
              <div>OP</div>
              <div>{dataLocal.op}</div>
            </div>
            <div className="detailDuo">
              <div>Referencia</div>
              <div>{dataLocal.referencia}</div>
            </div>
            <div className="detailDuo">
              <div>Confeccionista</div>
              <div>{dataLocal.confeccionista}</div>
            </div>
          </div>

          <div className="containerAllDetails">
            <div className="containerLeft">
              <div className="containerStart">

                <div className="detailDuo">
                  <div >Fecha de Asignacion</div>
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
                  <div>Estado</div>
                  <div>{dataLocal.estado}</div>
                </div>
              </div>


              <div className="containerStart">
                <div className="detailDuo">
                  <div>Tipo Producto</div>
                  <div>{dataLocal.tipo_producto}</div>
                </div>

                <div className="detailDuo">
                  <div>Unidades</div>
                  <div>{dataLocal.unidades}</div>
                </div>

                <div className="detailDuo">
                  <div>Valor unidad</div>
                  <div>{new Intl.NumberFormat().format(dataLocal.valor_unidad)}$</div>
                </div>

                <div className="detailDuo">
                  <div>Valor Total</div>
                  <div>{new Intl.NumberFormat().format(dataLocal.unidades * dataLocal.valor_unidad)}$</div>
                </div>
              </div>

              <div className="containerStart">
                <div className="detailDuo">
                  <div>Tejido</div>
                  <div>{dataLocal.tejido}</div>
                </div>

                <div className="detailDuo">
                  <div>Zona</div>
                  <div>{dataLocal.zona}</div>
                </div>

                <div className="detailDuo">
                  <div>Capacidad</div>
                  <div>{dataLocal.capacidad}</div>
                </div>

                <div className="detailDuo">
                  <div>Ciclo</div>
                  <div>{dataLocal.ciclo}</div>
                </div>

              </div>
              {
                dataLocal.auditado == false ?
                  <div className=" containerAuditoria">
                    <div className="noAuditado">No Ha sido auditado</div>
                  </div>
                  :
                  <div className=" containerAuditoria">
                    <div className="auditoriaLeft">
                      <div >
                        <div>Auditoria</div>
                        <div className="cabeceroAuditoria">
                          <div>Fecha Auditoria: {dataLocal.auditoria?.fecha_auditoria}</div>
                          <div>Auditor: {dataLocal.auditoria?.auditor}</div>
                          <div>Unidades Muestra: {dataLocal.auditoria?.unidades_muestra}</div>
                          <div>Muestra fisica: {dataLocal.auditoria?.muestra_fisica}</div>
                          <div>Colaboradores Karibik: {dataLocal.auditoria?.colaboradores_karibik}</div>
                          <div>Tipo de revision: premuestra</div>
                          <div className="composicionAuditoria">Composicion: {dataLocal.auditoria?.composicion}</div>
                        </div>
                      </div>
                      
                      {
                        dataLocal.auditoria?.medidas.length > 0 && Number(dataLocal.auditoria.medidas[0].talla) ?
                          <div >
                            <div>Medidas</div>
                            <div className="containerMedidasLetra">
                              <div className="seccionPorMedida">
                                <div>4</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === '4' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>6</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === '6' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>8</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === '8' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>10</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === '10' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>12</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === '12' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                            </div>

                          </div>
                          :
                          <div>

                            <div className="containerMedidasLetra">
                              <div className="seccionPorMedida">
                                <div>XXS</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === 'XXS' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>XS</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === 'XS' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>S</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === 'S' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>M</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === 'M' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>L</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === 'L' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                              <div className="seccionPorMedida">
                                <div>XL</div>
                                <div className="medidas">
                                  {
                                    dataLocal.auditoria?.medidas.length > 0 && dataLocal.auditoria?.medidas.map((e, i) =>
                                      e.talla === 'XL' &&
                                      <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                                    )
                                  }
                                </div>
                              </div>

                            </div>
                          </div>
                      }


                    </div>

                    <div className="auditoriaRight">
                      <div >
                        <div>No Conformidades</div>
                        <div className="noConformidades">
                          {
                            dataLocal.auditoria?.segundas.length > 0 && dataLocal.auditoria.segundas.map((e, i) =>
                              <div key={i}>
                                {e.defecto}: {e.cantidad}
                              </div>

                            )
                          }
                        </div>

                        <div>Total: {dataLocal.auditoria?.segundas.length > 0 &&
                          dataLocal.auditoria.segundas.reduce((acc, a) => acc += Number(a.cantidad), 0)}</div>
                      </div >

                      <div >
                        <div>Faltantes</div>
                        <div className="faltantes">
                          {
                            dataLocal.auditoria?.faltantes.length > 0 && dataLocal.auditoria.faltantes.map((e, i) =>
                              <div key={i}>
                                {e.talla}: {e.cantidad}
                              </div>
                            )
                          }
                        </div>
                        <div>Total: {dataLocal.auditoria?.faltantes.length > 0 &&
                          dataLocal.auditoria.faltantes.reduce((acc, a) => acc += Number(a.cantidad), 0)}</div>
                      </div>

                      <div >
                        <div>Cobros</div>
                        {
                          dataLocal.auditoria?.cobros &&
                          <div>Descripcion: {dataLocal.auditoria?.cobros.descripcion}</div>
                        }

                        <div className="cobros">

                          {
                            dataLocal.auditoria?.cobros &&
                            <div>Cantidad:{dataLocal.auditoria?.cobros.cantidad}</div>
                          }
                          {
                            dataLocal.auditoria?.cobros &&
                            <div>Valor: { new Intl.NumberFormat().format(dataLocal.auditoria?.cobros.valor)}$</div>
                          }

                        </div>

                      </div>
                      <div className="primeras">
                        {
                          dataLocal.auditoria?.primeras &&
                          <div>Total Primeras: {dataLocal.auditoria.primeras}</div>
                        }
                      </div>

                    </div>

                  </div>
              }

            </div>

            <div className="containerRight">
              <div className="containerObservacion">
                <div>Obervacion</div>
                <div>{dataLocal.observacion}</div>
              </div>

              <div>
                <div className="detailDuo">
                  <div>Sam</div>
                  <div>{dataLocal.sam}</div>
                </div>
                <div className="detailDuo">
                  <div>Sam total</div>
                  <div>{dataLocal ? Number(dataLocal.sam) * Number(dataLocal.unidades) : ""}</div>
                </div>
              </div>

              <div>
                <div className="detailDuo">
                  <div>Eficiencia</div>
                  <div>{dataLocal.eficiencia}</div>
                </div>
                <div className="detailDuo">
                  <div>Modulo</div>
                  <div>{dataLocal.modulo}</div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
      {confirmDelete && <p className="confirmEliminado">{confirmDelete}</p>}
      <EditarLote data={dataLocal} active={activeEdit} closeEdit={editLote} />
    </div>
  );
};

export default DetailsLote;
