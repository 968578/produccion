const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()
const { verifyTokenConfeccionista, verifyTokenGeneral } = require('../middlewares/middlewares')



//solicitar lotes    
//  ruta /lotes
router.get('/get', verifyTokenGeneral, (req, res) => {

  try {

    const query = "SELECT * FROM lotes WHERE estado != 'Inactivo';"

    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {

        if (error) throw error
        res.json(results)
        conn.release()
      })

    })

  } catch (error) {
    console.log(error)
  }
})


//solicitar solo los lotes inactivos
// ruta /lotes
router.get('/get-inactivos', (req, res) => {

  try {

    const query = "SELECT * FROM lotes WHERE estado = 'Inactivo';"

    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {

        if (error) throw error
        res.json(results)
        conn.release()
      })

    })

  } catch (error) {
    console.log(error)
  }
})


//  para solicitar lotes por op
//  ruta /lotes
router.get('/op', verifyTokenGeneral, (req, res) => {

  const { op } = req.query

  const queryLotes = `SELECT * FROM lotes WHERE op = '${op}';`
  const queryAuditoria = `SELECT * FROM auditorias WHERE op = '${op}';`
  const queryCiclos = `SELECT * FROM ciclos WHERE op = '${op}'`

  let lote = {}


  try {
    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(queryLotes, (error, results) => {
        if (error) throw error
        lote = { ...results[0] }
      })

      conn.query(queryCiclos, (error, results) => {
        if (error) throw error
        lote.ciclo = [...results]
      })

      conn.query(queryAuditoria, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
          lote.auditoria = [...results]
        } else {
          conn.release()
          return res.send(lote)
        }

        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryFaltantes = `SELECT * FROM faltantes WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryFaltantes, (error, results) => {
            if (error) throw error
            lote.auditoria[i].faltantes = [...results]
          })
        }


        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryNoConformidades = `SELECT * FROM no_conformidades WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryNoConformidades, (error, results) => {
            if (error) throw error
            lote.auditoria[i].no_conformidades = [...results]
          })
        }

        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryMedidas = `SELECT * FROM medidas WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryMedidas, (error, results) => {
            if (error) throw error
            lote.auditoria[i].medidas = [...results]

          })
        }

        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryCobros = `SELECT * FROM cobros WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryCobros, (error, results) => {

            if (error) throw error
            lote.auditoria[i].cobros = { ...results[0] }
            if (i === lote.auditoria.length - 1) {
              res.send(lote)
            }

          })
        }
        conn.release()
      })

    })

  } catch (error) {
    console.log(error)
  }
})


router.get('/op-from-confeccionista', verifyTokenConfeccionista, (req, res) => {
  const { op } = req.query
  const { nombre } = req.user

  const queryLotes = `SELECT * FROM lotes WHERE op = '${op}' AND confeccionista = '${nombre}';`
  const queryAuditoria = `SELECT * FROM auditorias WHERE op = '${op}';`
  const queryCiclos = `SELECT * FROM ciclos WHERE op = '${op}'`

  let lote = {}

  try {
    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(queryLotes, (error, results) => {
        if (error) throw error
        lote = { ...results[0] }
      })

      conn.query(queryCiclos, (error, results) => {
        if (error) throw error
        lote.ciclo = [...results]
      })

      conn.query(queryAuditoria, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
          lote.auditoria = [...results]
        } else {
          conn.release()
          return res.send(lote)
        }

        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryFaltantes = `SELECT * FROM faltantes WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryFaltantes, (error, results) => {
            if (error) throw error
            lote.auditoria[i].faltantes = [...results]
          })
        }


        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryNoConformidades = `SELECT * FROM no_conformidades WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryNoConformidades, (error, results) => {
            if (error) throw error
            lote.auditoria[i].no_conformidades = [...results]
          })
        }

        for (let i = 0; i < lote.auditoria.length; i++) {
          const queryMedidas = `SELECT * FROM medidas WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryMedidas, (error, results) => {
            if (error) throw error
            lote.auditoria[i].medidas = [...results]

          })
        }

        for (let i = 0; i < lote.auditoria.length; i++) {

          const queryCobros = `SELECT * FROM cobros WHERE auditoria_id = '${lote.auditoria[i].auditoria_id}';`

          conn.query(queryCobros, (error, results) => {

            if (error) throw error
            lote.auditoria[i].cobros = { ...results[0] }
            if (i === lote.auditoria.length - 1) {
              res.send(lote)
              conn.release()
            }

          })
        }

      })
    })

  } catch (error) {
    console.log(error)
  }
})


// para solictar lotes por nombre de confeccionista
// ruta /lotes
router.get('/nombre', verifyTokenConfeccionista, (req, res) => {

  const nombre = req.user.nombre
  try {
    const query = `SELECT * FROM lotes  WHERE lotes.confeccionista = '${nombre}' AND estado != 'Inactivo';`
    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {

        if (error) throw error

        return res.json({ msj: 'Autorizado', lotes: results, nombre })
      })
      conn.release()

    })
  } catch (error) {
    console.log(error)
  }
})


// para agregar lotes   
//  ruta /lotes
router.post('/insert', verifyTokenGeneral, (req, res) => {
  const { op, referencia, coleccion, fecha_ingreso_cedi, tejido, tipo_producto, unidades, sam, estado, confeccionista,
    fecha_asignacion, fecha_entrega, capacidad, fecha_probable_entrega, eficiencia,
    valor_unidad, modulo, zona } = req.body

  try {
    // console.log(data)
    // observacion lo dejo vacio ya que cuando se crea no es necesario una observacion por ahora
    const observacion = ''
    // res.send('oki')
    const query = `INSERT INTO lotes (op, referencia ,coleccion, fecha_ingreso_cedi, tejido, tipo_producto, unidades, sam, estado , confeccionista,
      fecha_asignacion, fecha_entrega, capacidad, fecha_probable_entrega, eficiencia, valor_unidad ,modulo, zona, observacion ) VALUES 
        ('${op}', '${referencia}', '${coleccion}', '${fecha_ingreso_cedi}', '${tejido}', '${tipo_producto}', '${unidades}', '${sam}', '${estado}', '${confeccionista}',
          '${fecha_asignacion}', '${fecha_entrega}', '${capacidad}', '${fecha_probable_entrega}', '${eficiencia}',
            '${valor_unidad}', '${modulo}', '${zona}', '${observacion}');`

    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {

        if (error) {
          if (error.errno === 1062) {
            res.send('¡¡OP ya existe, cambie la OP para que sea unica!!')
          } else throw error

        } else {
          res.send('Agregado con exito')
        }
        conn.release()
      })
    })

  } catch (error) {
    console.log(error)
  }

})


// para actualizar los lotes 
//  ruta /lotes
router.put('/update', verifyTokenGeneral, (req, res) => {

  const { op, referencia, tejido, coleccion, fecha_ingreso_cedi, tipo_producto, unidades, sam, estado, confeccionista,
    fecha_asignacion, fecha_entrega, capacidad, fecha_probable_entrega, eficiencia,
    valor_unidad, modulo, zona } = req.body

  try {
    const queryUpdateLote = `UPDATE lotes SET referencia = '${referencia}', tejido = '${tejido}', coleccion = '${coleccion}',
      fecha_ingreso_cedi = '${fecha_ingreso_cedi}', tipo_producto = '${tipo_producto}',
      unidades = '${unidades}', sam = '${sam}', estado = '${estado}', confeccionista = '${confeccionista}', 
      fecha_asignacion = '${fecha_asignacion}', fecha_entrega = '${fecha_entrega}', capacidad='${capacidad}',
      fecha_probable_entrega = '${fecha_probable_entrega}', eficiencia= '${eficiencia}', valor_unidad = '${valor_unidad}', 
      modulo = '${modulo}', zona = '${zona}' WHERE op = '${op}'`

    pool.getConnection((err, conn) => {
      if (err) throw err

      if (estado === 'Recepcion') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0) {
            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Recepcion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Ciclo de RECEPCION iniciado' })
            })
          }
          else if (results.length === 1) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })
          } else if (results.length > 1) {
            res.send({ msj: 'Lote ya paso por RECEPCION anteriormente' })
          }
        })



      } else if (estado === 'Preparacion') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0) {
            res.send({ msj: 'No puede estar en PREPARACION sin Recepcion' })

          } else if (results.length === 1 && results[0].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Preparacion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloRecepcion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                    WHERE id_ciclo = ${results[0].id_ciclo};`
            conn.query(queryUpdateCicloRecepcion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Ciclo de PREPARACION iniciado' })
            })
          } else if (results.length === 2) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })
          } else if (results.length > 2) {
            res.send({ msj: 'Lote ya paso por PREPARACION anteriormente' })
          }

        })


      } else if (estado === 'Confeccion') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1) {
            res.send({ msj: 'No puede estar en CONFECCION sin preparacion' })

          } else if (results.length === 2 && results[1].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Confeccion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloPreparacion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[1].id_ciclo};`
            conn.query(queryUpdateCicloPreparacion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Ciclo de CONFECCION iniciado' })
            })
          } else if (results.length === 3) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })
          } else if (results.length > 3) {
            res.send({ msj: 'Lote ya paso por CONFECCION anteriormente' })

          }
        })


      } else if (estado === 'Lavanderia') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1 || results.length === 2) {
            res.send({ msj: 'El lote no puede estar en LAVANDERIA sin confeccion' })
          }
          else if (results.length === 3 && results[2].tipo === 'Confeccion' && results[2].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Lavanderia' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                    WHERE id_ciclo = ${results[2].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Ciclo de LAVANDERIA iniciado' })
            })

          } else if (results.length === 4 && results[3].tipo === 'Terminacion') {
            res.send({ msj: 'Lote no pasa por LAVANDERIA' })

          } else if (results.length === 4 && results[3].tipo === 'Lavanderia') {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })

          } else if (results.length > 4) {
            res.send({ msj: 'Lote ya paso por LAVANDERIA anteriormente' })

          }
        })


      } else if (estado === 'Terminacion') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1 || results.length === 2) {
            res.send({ msj: 'El lote no puede estar en Terminacion sin CONFECCION' })

          } else if (results.length === 3 && results[2].tipo === 'Confeccion' && results[2].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryUpdateCicloTerminacion = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Terminacion', '${fechaCortaInicio}', '${op}');`
            conn.query(queryUpdateCicloTerminacion, (error, results) => {
              if (error) throw error
            })

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                      WHERE id_ciclo = ${results[2].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Ciclo de TERMINACION iniciado' })
            })

          } else if (results.length === 4 && results[3].tipo === 'Lavanderia' && results[3].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Terminacion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })
            const queryUpdateCicloLavanderia = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                    WHERE id_ciclo = ${results[3].id_ciclo};`
            conn.query(queryUpdateCicloLavanderia, (error, results) => {
              if (error) throw error
            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Ciclo de TERMINACION Iniciado' })
            })
          } else if (results.length === 4 && results[3].tipo === 'Terminacion' && results[3].fecha_final) {
            res.send({ msj: 'Lote ya paso por TERMINACION anteriormente' })

          } else if (results.length === 4 && results[3].tipo === 'Terminacion' && results[3].fecha_final === null) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error
              res.send({ msj: 'Lote Actualizado con exito' })
            })

          } else if (results.length === 5 && results[4].tipo === 'Terminacion' && results[4].fecha_final === null) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })
          } else if (results.length === 5 && results[4].fecha_final) {
            res.send({ msj: 'Lote ya paso por Terminacion anteriormente' })

          }
        })


      } else if (estado === 'Paro') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 1 || results.length === 2 || results.length === 3) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })

          } else if ((results.length === 4 && results[3].fecha_final === null) || (results.length === 5 && results[4].fecha_final === null)) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })

          } else if ((results.length === 4 && results[3].fecha_final) || (results.length === 5 && results[4].fecha_final)) {
            res.send({ msj: 'Lote ya fue LIBERADO no puede estar en PARO' })
          }
        })


      } else if (estado === 'Liberado') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1 || results.length === 2 || results.length === 3) {
            res.send({ msj: 'No puede liberarse sin TERMINACION' })

          } else if (results.length === 4 && results[3].tipo === 'Terminacion' && results[3].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[3].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Liberado con exito' })
            })

          } else if (results.length === 4 && results[3].tipo === 'Lavanderia') {
            res.send({ msj: 'No puede Liberarse sin terminacion' })

          } else if (results.length === 4 && results[3].tipo === 'Terminacion' && results[3].fecha_final) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote actualizado con exito' })
            })

          } else if (results.length === 5 && results[4].tipo === 'Terminacion' && results[4].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[4].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote LIBERADO con exito' })
            })

          } else if (results.length === 5 && results[4].fecha_final && results[4].tipo === 'Terminacion') {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send({ msj: 'Lote Actualizado con exito' })
            })
          }
        })

      } else if (estado === 'Corte' || estado === 'Lote Integracion' || estado === 'Para Asignar') {

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.json({ msj: 'Lote actualizado con exito' })
            })
          } else if (results.length > 0) {
            res.json({ msj: 'Lote No puede volver a estados iniciales' })
          }
        })

      } else {
        conn.query(queryUpdateLote, (error, results) => {
          if (error) throw error

          res.json({ msj: 'Lote actualizado con exito' })
        })

      }

      conn.release()
    })

  } catch (error) {
    console.log(error)
  }

})


// este nos sirve para actualizar lotes desde un confeccionista
// recibe menos datos ya que el confeccionista no puede actualizar mucho
// ruta /lotes
router.put('/update-from-confeccionista', verifyTokenConfeccionista, (req, res) => {
  const { observacion, estado, op, fecha_probable_entrega, unidades_terminadas } = req.body
  try {
    const queryUpdateLote = `UPDATE lotes SET observacion = '${observacion}', estado = '${estado}', 
    unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
      WHERE op ='${op}';`

    if (estado === 'Recepcion') {

      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0) {
            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Recepcion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Ciclo de RECEPCION iniciado')
            })
          }
          else if (results.length === 1) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })
          } else if (results.length > 1) {
            res.send('Lote ya paso por RECEPCION anteriormente')
          }
        })

        conn.release()
      })
    } else if (estado === 'Preparacion') {
      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0) {
            res.send('No puede estar en PREPARACION sin Recepcion')

          } else if (results.length === 1 && results[0].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Preparacion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloRecepcion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[0].id_ciclo};`
            conn.query(queryUpdateCicloRecepcion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Ciclo de PREPARACION iniciado')
            })
          } else if (results.length === 2) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })
          } else if (results.length > 2) {
            res.send('Lote ya paso por PREPARACION anteriormente')
          }

        })
        conn.release()
      })
    }
    else if (estado === 'Confeccion') {

      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1) {
            res.send('No puede estar en CONFECCION sin preparacion')

          } else if (results.length === 2 && results[1].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Confeccion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloPreparacion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                WHERE id_ciclo = ${results[1].id_ciclo};`
            conn.query(queryUpdateCicloPreparacion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Ciclo de CONFECCION iniciado')
            })
          } else if (results.length === 3) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })
          } else if (results.length > 3) {
            res.send('Lote ya paso por CONFECCION anteriormente')

          }
        })
        conn.release()
      })

    } else if (estado === 'Lavanderia') {
      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1 || results.length === 2) {
            res.send('No puede estar en LAVANDERIA sin confeccion')
          }
          else if (results.length === 3 && results[2].tipo === 'Confeccion' && results[2].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Lavanderia' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[2].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Ciclo de LAVANDERIA iniciado')
            })

          } else if (results.length === 4 && results[3].tipo === 'Terminacion') {
            res.send('Lote no pasa por LAVANDERIA')

          } else if (results.length === 4 && results[3].tipo === 'Lavanderia') {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })

          } else if (results.length > 4) {
            res.send('Lote ya paso por LAVANDERIA anteriormente')

          }
        })
        conn.release()
      })
    } else if (estado === 'Terminacion') {
      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0 || results.length === 1 || results.length === 2) {
            res.send('No puede estar en Terminacion sin CONFECCION')

          } else if (results.length === 3 && results[2].tipo === 'Confeccion' && results[2].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryUpdateCicloTerminacion = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Terminacion', '${fechaCortaInicio}', '${op}');`
            conn.query(queryUpdateCicloTerminacion, (error, results) => {
              if (error) throw error
            })

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                    WHERE id_ciclo = ${results[2].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Ciclo de TERMINACION iniciado')
            })

          } else if (results.length === 4 && results[3].tipo === 'Lavanderia' && results[3].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Terminacion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })
            const queryUpdateCicloLavanderia = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[3].id_ciclo};`
            conn.query(queryUpdateCicloLavanderia, (error, results) => {
              if (error) throw error
            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Ciclo de TERMINACION Iniciado')
            })
          } else if (results.length === 4 && results[3].tipo === 'Terminacion' && results[3].fecha_final === null) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error
              res.send('Lote Actualizado con exito')
            })

          } else if (results.length === 4 && results[3].tipo === 'Terminacion' && results[3].fecha_final) {
            res.send('Lote ya paso por TERMINACION anteriormente')

          } else if (results.length === 5 && results[4].tipo === 'Terminacion' && results[4].fecha_final === null) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })
          } else if (results.length === 5 && results[4].fecha_final) {
            res.send('Lote ya paso por Terminacion anteriormente')

          }
        })
        conn.release()
      })
    } else if (estado === 'Paro') {

      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 1 || results.length === 2 || results.length === 3) {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })

          } else if ((results.length === 4 && results[3].fecha_final === null) || (results.length === 5 && results[4].fecha_final === null)) {

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })

          } else if ((results.length === 4 && results[3].fecha_final) || (results.length === 5 && results[4].fecha_final)) {
            res.send('Lote ya fue LIBERADO no puede estar en PARO')
          }
        })
        conn.release()
      })
    } else {
      pool.getConnection((err, conn) => {
        if (err) throw err

        conn.query(queryUpdateLote, (error, results) => {
          if (error) throw error
          res.send('Lote Actualizado con exito')
        })

      })
    }

  } catch (error) {
    console.log(error)
  }
})


// este nos sirve para eliminar los lotes  
//  ruta /lotes
router.delete('/delete', verifyTokenGeneral, (req, res) => {
  const { op } = req.query
  try {
    const query = `DELETE FROM lotes WHERE op = '${op}'`
    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {

        if (error) throw error
        res.json({ msj: 'Eliminado con exito' })
        conn.release()
      })
    })

  } catch (error) {
    console.log(error)
  }
})


//ruta para volver a activar un lote
//ruta /lotes
router.put('/update-activar-lote', verifyTokenGeneral, (req, res) => {
  const { op } = req.body
  try {
    const query = `UPDATE lotes SET estado = 'Liberado' WHERE op = '${op}';`
    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {
        if (error) throw error
        res.json({ msj: 'Lote Activado' })
      })

      conn.release()
    })

  } catch (error) {

  }
})


// ruta para exportar a excel los lotes
// ruta /lotes
router.get('/get-export', verifyTokenGeneral, (req, res) => {
  let lotes = []
  try {
      const query = `SELECT * FROM lotes WHERE estado != 'Inactivo';`
      pool.getConnection((err, conn) => {
        if (err) throw err
        conn.query(query, (error, results) => {
          if (error) throw error

          if (results) {
            lotes = [...results]
          }

          for (let i = 0; i < lotes.length; i++) {
            const queryCiclos = `SELECT * FROM ciclos WHERE op = '${lotes[i].op}';`

            conn.query(queryCiclos, (errorCiclo, resultsCiclo) => {
              if (errorCiclo) throw errorCiclo

              if (resultsCiclo) {
                lotes[i].ciclo = resultsCiclo
              }
              if (i === lotes.length - 1) {
                res.send(lotes)
              }
            })
          }
        })
        conn.release()
      })
    
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
