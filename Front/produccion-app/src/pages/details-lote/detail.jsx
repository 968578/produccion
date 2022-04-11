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
    axios.get("http://localhost:3000/lotes/get").then((r) => {
      // dispatch(loadAllLotes(r.data))
      // dispatch(loadShowLotes(r.data))
      setDataLocal(...r.data.filter((e) => e.op === params.op));
    });
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

  console.log(dataLocal)

  return (
    <div>
      <div className="containerHomeButton">
        <Link to="/" className="HomeFormLote">
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
                  <div>Teido</div>
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

              <div className=" containerAuditoria">
                <div className="auditoriaLeft">
                  <div >
                  <div>Auditoria</div>
                    <div className="cabeceroAuditoria">
                      <div>Fecha Auditoria: feb, 20 , 2022</div>
                      <div>Auditor: Omar Echavarria</div>
                      <div>Unidades Muestra: 10</div>
                      <div>Muestra fisica: si</div>
                      <div>Colaboradores Karibik: 10</div>
                      <div>Tipo de revision: premuestra</div>
                      <div className="composicionAuditoria">composicion: 100% algodon, 10% poliester, 35% plastico</div>
                    </div>
                  </div>

                  <div >
                    <div>No Conformidades</div>
                    <div className="noConformidades">
                      <div>tela: 3</div>
                      <div>corte: 2</div>
                      <div>estampacion: 9</div>  
                    </div>
                    <div>Total: 14</div>
                  </div >

                  <div >
                    <div>Faltantes</div>
                    <div className="faltantes">
                      <div>talla 4: 2</div>
                      <div>talla XS: 6</div>
                      <div>talla M: 2</div>
                    </div>
                    <div>Total: 10</div>
                  </div>

                  <div >
                    <div>Cobros</div>
                    <div>Descripcion: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, quaerat?</div>
                    <div className="cobros">
                      <div>catidad: 10</div>
                      <div>valor: 25.000$</div>

                    </div>

                  </div>
                  <div className="primeras">
                    <div>Total Primeras: 20</div>
                  </div>

                </div>

                <div className="auditoriaRight">
                  <h3>Medidas</h3>
                </div>

              </div>
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
