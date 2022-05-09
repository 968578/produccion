const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()
const { verifyTokenConfeccionista, verifyTokenGeneral } = require('../middlewares/middlewares')



//solicitar lotes    
//  ruta /lotes
router.get('/get', verifyTokenGeneral ,(req, res) => {

  try {

    const query = 'SELECT * FROM lotes;'

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
router.get('/op', verifyTokenGeneral ,(req, res) => {

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


router.get('/op-from-confeccionista', verifyTokenConfeccionista , (req,res)=>{
  const { op } = req.query
  const {nombre} = req.user

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


// para solictar lotes por nombre de confeccionista
// ruta /lotes
router.get('/nombre', verifyTokenConfeccionista, (req, res) => {

  const nombre = req.user.nombre
  try {
    const query = `SELECT * FROM lotes  WHERE lotes.confeccionista = '${nombre}';`
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
router.post('/insert', verifyTokenGeneral ,(req, res) => {
  const { op, referencia, tejido, tipo_producto, unidades, sam, estado, confeccionista,
    fecha_asignacion, fecha_entrega, capacidad, fecha_probable_entrega, eficiencia,
    valor_unidad, modulo, zona } = req.body

  try {
    // console.log(data)
    // observacion lo dejo vacio ya que cuando se crea no es necesario una observacion por ahora
    const observacion = ''
    // res.send('oki')
    const query = `INSERT INTO lotes (op, referencia , tejido, tipo_producto, unidades, sam, estado , confeccionista,
      fecha_asignacion, fecha_entrega, capacidad, fecha_probable_entrega, eficiencia, valor_unidad ,modulo, zona, observacion ) VALUES 
        ('${op}', '${referencia}', '${tejido}', '${tipo_producto}', '${unidades}', '${sam}', '${estado}', '${confeccionista}',
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
router.put('/update', verifyTokenGeneral ,(req, res) => {

  const { op, referencia, tejido, tipo_producto, unidades, sam, estado, confeccionista,
    fecha_asignacion, fecha_entrega, capacidad, fecha_probable_entrega, eficiencia,
    valor_unidad, modulo, zona } = req.body

  try {
    const query = `UPDATE lotes SET referencia = '${referencia}', tejido = '${tejido}', tipo_producto = '${tipo_producto}',
      unidades = '${unidades}', sam = '${sam}', estado = '${estado}', confeccionista = '${confeccionista}', 
      fecha_asignacion = '${fecha_asignacion}', fecha_entrega = '${fecha_entrega}', capacidad='${capacidad}',
      fecha_probable_entrega = '${fecha_probable_entrega}', eficiencia= '${eficiencia}', valor_unidad = '${valor_unidad}', 
      modulo = '${modulo}', zona = '${zona}' WHERE op = '${op}'`

    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {
        if (error) throw error

        res.json({msj:'Actualizado con exito'})
        conn.release()
      })
    })

  } catch (error) {
    console.log(error)
  }

})


// este nos sirve para actualizar lotes desde un confeccionista
// recibe menos datos ya que el confeccionista no puede actualizar mucho
// ruta /lotes
router.put('/update-from-confeccionista', verifyTokenConfeccionista ,(req, res) => {
  const { observacion, estado, op, fecha_probable_entrega, unidades_terminadas } = req.body
  try {
    const queryUpdateLote = `UPDATE lotes SET observacion = '${observacion}', estado = '${estado}', 
    unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
      WHERE op ='${op}';`
    if (estado === 'Confeccion') {

      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length > 1) {

            const queryUpdateLoteSinEstado = `UPDATE lotes SET observacion = '${observacion}', 
            unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
              WHERE op ='${op}';`
            conn.query(queryUpdateLoteSinEstado, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito excepto el estado, el LOTE ya paso por confeccion Anteriormente')
            })
          }else if(results.length === 1 && results[0].fecha_final === null){
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })
          } else  {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Confeccion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, ciclo de CONFECCION iniciado')
            })

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

          if (results.length === 0) {
            res.send('El lote no puede estar en lavanderia sin CONFECCION')

          } else if (results.length === 1 && results[0].tipo === 'Confeccion' && results[0].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Lavanderia' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[0].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, ciclo de LAVANDERIA iniciado')
            })

          } else if (results.length === 1 && results[0].tipo === 'Confeccion' && results[0].fecha_final) {
            const queryUpdateLoteSinEstado = `UPDATE lotes SET observacion = '${observacion}', 
            unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
              WHERE op ='${op}';`
            conn.query(queryUpdateLoteSinEstado, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito, el Lote No pasa por Lavanderia')
            })

          }else if( results.length === 2 && results[1].fecha_final === null){

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })

          } else if (results.length > 1) {

            const queryUpdateLoteSinEstado = `UPDATE lotes SET observacion = '${observacion}', 
            unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
              WHERE op ='${op}';`
            conn.query(queryUpdateLoteSinEstado, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito excepto el estado, el LOTE ya paso por Lavanderia')
            })
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

          if (results.length === 0) {
            res.send('El lote no puede estar en Terminacion sin CONFECCION')

          } else if (results.length === 1 && results[0].fecha_final === null) {
            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;


            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[0].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, Ciclo de CONFECCION Terminado')
            })

          }else if(results.length === 1 && results[0].fecha_final){
            const queryUpdateLoteSinEstado = `UPDATE lotes SET observacion = '${observacion}', 
            unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
              WHERE op ='${op}';`
            conn.query(queryUpdateLoteSinEstado, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito excepto el estado, el LOTE ya paso por Terminacion Anteriormente')
            })

          } else if (results.length === 2) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryCiclos = `INSERT INTO ciclos (tipo, fecha_inicio, op) VALUES('Terminacion' , '${fechaCortaInicio}', '${op}');`
            conn.query(queryCiclos, (error, results) => {
              if (error) throw error

            })
            const queryUpdateCicloLavanderia = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[1].id_ciclo};`
            conn.query(queryUpdateCicloLavanderia, (error, results) => {
              if (error) throw error
            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, Ciclo de LAVANDERIA finalizado, inicia Terminacion')
            })
          } else if(results.length === 3 && results[2].fecha_final){

            const queryUpdateLoteSinEstado = `UPDATE lotes SET observacion = '${observacion}', 
            unidades_terminadas = '${unidades_terminadas}', fecha_probable_entrega = '${fecha_probable_entrega}'
              WHERE op ='${op}';`
            conn.query(queryUpdateLoteSinEstado, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito excepto el estado, el LOTE ya paso por Terminacion')
            })
          } else {
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado con exito')
            })
          }
        })
        conn.release()
      })
    } else if (estado === 'Liberado') {
      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if (results.length === 0) {
            res.send('El lote no puede estar en Liberado sin CONFECCION')
          } else if (results.length === 1 && results[0].tipo === 'Confeccion' && results[0].fecha_final === null) {

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;


            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[0].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, Ciclo de CONFECCION Terminado')
            })

          } else if (results.length === 1 && results[0].tipo === 'Confeccion' && results[0].fecha_final) {

              conn.query(queryUpdateLote, (error, results) => {
                if (error) throw error

                res.send('Lote Actualizado con exito, Ciclo de Confeccion finalizado Anteriormente')
              })

          }else if (results.length === 2){
            res.send('El lote no puede estar en Liberado sin TERMINACION')
          }else if (results.length === 3 && results[2].fecha_final === null){

            const today = new Date()
            const fechaCortaInicio = `${today.getFullYear()}-${`${today.getMonth() + 1}`.length > 1 ? `${today.getMonth() + 1}`
              : `0${today.getMonth() + 1}`}-${`${today.getDate()}`.length > 1 ? `${today.getDate()}` : `0${today.getDate()}`}`;

            const queryUpdateCicloConfeccion = `UPDATE ciclos SET fecha_final = '${fechaCortaInicio}' 
                                                  WHERE id_ciclo = ${results[2].id_ciclo};`
            conn.query(queryUpdateCicloConfeccion, (error, results) => {
              if (error) throw error

            })

            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, Ciclo de TERMINACION finalizado')
            })
          }else  if( results.length === 3 && results[2].fecha_final){
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error

              res.send('Lote Actualizado, Ciclo de TERMINACION ya habia finalizado')
            })
          }
        })
        conn.release()
      })
    }else if(estado === 'Paro'){

      pool.getConnection((err, conn) => {
        if (err) throw err

        const queryConfirm = `SELECT * FROM ciclos WHERE op = '${op}';`
        conn.query(queryConfirm, (error, results) => {
          if (error) throw error

          if(results.length === 1 && results[0].fecha_final){
            res.send('El Lote ya Paso a Terminacion, no puede estar en PARO')

          }else if(results.length === 2 || (results.length === 3 && results[2].fecha_final === null) ){
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error
    
              res.send('Lote Actualizado con exito')
            })

          }else if(results.length === 3 && results[2].fecha_final ){
            res.send('Lote ya fue LIBERADO no puede estar en PARO')
          }else{
            conn.query(queryUpdateLote, (error, results) => {
              if (error) throw error
    
              res.send('Lote Actualizado con exito')
            })
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
        conn.release()
      })
    }


  } catch (error) {
    console.log(error)
  }
})


// este nos sirve para eliminar los lotes  
//  ruta /lotes
router.delete('/delete',verifyTokenGeneral , (req, res) => {
  const { op } = req.query
  try {
    const query = `DELETE FROM lotes WHERE op = '${op}'`
    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query(query, (error, results) => {

        if (error) throw error
        res.json({msj: 'Eliminado con exito'})
        conn.release()
      })
    })

  } catch (error) {
    console.log(error)
  }
})



module.exports = router
