import { useEffect, useState } from "react"

import { motion, AnimatePresence } from 'framer-motion'
import axios from "axios"

import './c-details-auditoria.css'


const variantsContainerAudit = {
  show: {
    y: 0,
    transition: {
      duration: 1

    },
  },
  hidden: {
    y: -1000,
    transition: {
      duration: 1

    }
  }
}

const varianstConfirmDelete={
  hidden:{
    scale:0
  },
  show:{
    scale:1,
    transition:{
      duration:0.4
    }
  }


}


const AuditoriaDetails = (props) => {

  const [active, setActive] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState('')

  const activeAuditoria = () => {
    setActive(!active)
  }

  const deleteAuditoria = () => {
    if (window.localStorage.getItem('accessTokenAuditoria') || window.localStorage.getItem('accessTokenAdmin')) {
      const auditoria_id_op = {
        auditoria_id: props.data.auditoria_id,
        op: props.data.op
      }
      const token = window.localStorage.getItem('accessTokenAuditoria') || window.localStorage.getItem('accessTokenAdmin')
      axios.delete(`${process.env.REACT_APP_API_URL}/auditorias/delete`, {
        params: auditoria_id_op,
        headers: {
          'authorization': 'Barrer ' + token
        }
      })
        .then(r => {
          setConfirmDelete(r.data.msj)
        })

    } else {
      setConfirmDelete('No puedes eliminar Una Auditoria')
    }
  }

  useEffect(() => {
    if (confirmDelete === 'Auditoria ELiminada') {
      document.getElementById('confirmDelete').scrollIntoView({
        behavior: 'smooth'
      })

      setTimeout(() => {
        setConfirmDelete('')
        window.location.reload()
      }, 2000)
    }else if(confirmDelete === 'No puedes eliminar Una Auditoria'){
      setTimeout(() => {
        setConfirmDelete('')
      }, 3000)
      
    }
  }, [confirmDelete])


  return (
    <div className="c-allAuditorias">
      <motion.div whileHover={{ scale: 0.95 }} onClick={activeAuditoria} className="b-activeAuditoria">
        <div className="detailDuoValue">{props.data?.auditor} </div>
        <div className="detailDuoValue titileTipoAuditoria">{props.data?.tipo_revision} </div>
        <motion.div layout className={active ? 'flechaAuditTrue' : 'flechaAudit'}  ></motion.div>
      </motion.div>
      <AnimatePresence>
        {
          active &&

          <motion.div initial='hidden' animate='show' exit='hidden' variants={variantsContainerAudit} className=" containerAuditoria">
            <div className="auditoriaLeft">
              <div className="c-editAndDeleteAuditoria">
                <div className="btn-EditAuditoria">
                  <div></div>
                  <div ></div>
                </div>
                <div onClick={deleteAuditoria} className="btn-deleteAuditoria">
                  <div>Eliminar Auditoria </div>
                  <div className="X"></div>
                </div>
              </div>
              <div >
                <div className="cabeceroAuditoria">
                  <div className="duoAuditoria">
                    <div className="titlesAuditoria">Fecha Auditoria: </div>
                    <div className="valuesAuditoria">{props.data?.fecha_auditoria}</div>
                  </div>
                  <div className="duoAuditoria">
                    <div className="titlesAuditoria">Auditor: </div>
                    <div className="valuesAuditoria">{props.data?.auditor}</div>
                  </div>
                  <div className="duoAuditoria">
                    <div className="titlesAuditoria">Unidades Muestra: </div>
                    <div className="valuesAuditoria">{props.data?.unidades_muestra}</div>
                  </div>
                  <div className="duoAuditoria">
                    <div className="titlesAuditoria">Muestra fisica: </div>
                    <div className="valuesAuditoria">{props.data?.muestra_fisica}</div>
                  </div>
                  <div className="duoAuditoria">
                    <div className="titlesAuditoria">Colaboradores Karibik: </div>
                    <div className="valuesAuditoria">{props.data?.colaboradores_karibik}</div>
                  </div>
                  <div className="duoAuditoria">
                    <div className="titlesAuditoria">Tipo de revision: </div>
                    <div className="valuesAuditoria">{props.data?.tipo_revision}</div>
                  </div>
                  <div className="composicionAuditoria">
                    <div className="titlesAuditoria">Composicion: </div>
                    <div className="valuesAuditoria">{props.data?.composicion}</div>
                  </div>
                </div>
              </div>

              {
                props.data?.medidas.length > 0 && Number(props.data.medidas[0].talla) ?
                  <div >
                    <div className="titlesAuditoria">Medidas</div>
                    <div className="containerMedidasLetra">
                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">4</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === '4' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">6</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === '6' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">8</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === '8' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">10</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === '10' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">12</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
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
                        <div className="titlesAuditoria">XXS</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === 'XXS' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">XS</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === 'XS' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">S</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === 'S' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">M</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === 'M' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">L</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
                              e.talla === 'L' &&
                              <div className="medidaSola" key={i} >{e.tipo}: {e.medida} </div>
                            )
                          }
                        </div>
                      </div>

                      <div className="seccionPorMedida">
                        <div className="titlesAuditoria">XL</div>
                        <div className="medidas">
                          {
                            props.data?.medidas.length > 0 && props.data?.medidas.map((e, i) =>
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
                <div className="titlesAuditoria">No Conformidades</div>
                <div className="noConformidades">
                  {
                    props.data?.no_conformidades.length > 0 && props.data.no_conformidades.map((e, i) =>
                      <div className="valuesAuditoria valuesNoconformidades" key={i}>
                        {e.defecto}: {e.cantidad}
                      </div>

                    )
                  }
                </div>

                <div className="titlesAuditoria">Total: {props.data?.segundas_totales}</div>
              </div >

              <div >
                <div className="titlesAuditoria">Faltantes</div>
                <div className="faltantes">
                  {
                    props.data?.faltantes.length > 0 && props.data.faltantes.map((e, i) =>
                      <div className="valuesAuditoria valuesNoconformidades" key={i}>
                        Talla {e.talla}: {e.cantidad}
                      </div>
                    )
                  }
                </div>
                <div className="titlesAuditoria">Total: {props.data?.faltantes_totales}</div>
              </div>

              <div >
                <div className="titlesAuditoria">Cobros</div>
                {
                  props.data?.cobros &&
                  <div>
                    <div className="titlesAuditoria">Descripcion: </div>
                    <div className="valuesAuditoria">{props.data?.cobros.descripcion}</div>
                  </div>
                }

                <div className="cobros">

                  {
                    props.data?.cobros &&
                    <div>
                      <div className="titlesAuditoria">Cantidad: </div>
                      <div className="valuesAuditoria">{props.data?.cobros.cantidad}</div>
                    </div>
                  }
                  {
                    props.data?.cobros &&
                    <div>
                      <div className="titlesAuditoria">Valor: </div>
                      <div className="valuesAuditoria">{props.data?.cobros.valor ?
                        new Intl.NumberFormat().format(props.data?.cobros.valor) : '0'}$</div>
                    </div>
                  }

                </div>
              </div>

              <div >
                <div className="titlesAuditoria">Aprobado:</div>
                <div className="valuesAuditoria">{props?.data.aprobado}</div>
              </div>

              <div className="primeras">
                {
                  props.data?.primeras &&
                  <div>
                    <div className="titlesAuditoria">Total Primeras: </div>
                    <div className="valuesAuditoria">{props.data.primeras}</div>
                  </div>
                }
              </div>

            </div>
          </motion.div>

        }
      </AnimatePresence>
      {
        confirmDelete !== '' && <motion.p initial='hidden' animate='show' variants={varianstConfirmDelete} id='confirmDelete'>{confirmDelete}</motion.p>
      }
    </div>

  )
}

export default AuditoriaDetails
