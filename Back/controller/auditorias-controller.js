const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()
const { verifyTokenGeneral, verifyTokenConfeccionista } = require('../middlewares/middlewares')

// agregar auditorias  
//    /auditorias
router.post('/insert', verifyTokenGeneral, (req, res) => {
  const { auditor, cobros, colaboradores_karibik, composicion, faltantes, faltantesTotal, fecha_auditoria, medidas, muestra_fisica,
    no_conformidades, op, primeras, segundas, tipo_revision, unidades_muestra, aprobado } = req.body

  let id

  try {

    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query('START TRANSACTION;', (error, results) => {
        if (error) throw error
      })

      const queryAuditoria = `INSERT INTO auditorias (op, fecha_auditoria, composicion, unidades_muestra, muestra_fisica, tipo_revision,
        colaboradores_karibik, auditor, faltantes_totales, segundas_totales, primeras, aprobado)  VALUES ('${op}', '${fecha_auditoria}',
        '${composicion}', '${unidades_muestra}', '${muestra_fisica}', '${tipo_revision}', '${colaboradores_karibik}', '${auditor}',
        '${faltantesTotal}', '${segundas}', '${primeras}', '${aprobado}');`
      conn.query(queryAuditoria, (error, results) => {
        if (error) throw error
        id = results.insertId
      })

      const queryUpdateAuditado = `UPDATE lotes SET auditado = ${true} WHERE op = '${op}';`
      conn.query(queryUpdateAuditado, (error, results) => {
        if (error) throw error

        if (no_conformidades.length > 0) {
          for (let i = 0; i < no_conformidades.length; i++) {
            if (no_conformidades[i].defecto && no_conformidades[i].cantidad) {

              const queryNoConformidades = `INSERT INTO no_conformidades (auditoria_id, defecto, cantidad)
                VALUES(${id}, '${no_conformidades[i].defecto}', '${no_conformidades[i].cantidad}');`

              conn.query(queryNoConformidades, (error, results) => {
                if (error) throw error
              })
            }
          }
        }

        if (faltantes.length > 0) {
          for (let i = 0; i < faltantes.length; i++) {
            if (faltantes[i].talla && faltantes[i].cantidad) {

              const queryFaltantes = `INSERT INTO faltantes (auditoria_id, talla, cantidad)
                  VALUES(${id}, '${faltantes[i].talla}', '${faltantes[i].cantidad}');`

              conn.query(queryFaltantes, (error, results) => {
                if (error) throw error
              })
            }
          }
        }

        if (medidas.length > 0) {
          for (let i = 0; i < medidas.length; i++) {
            if (medidas[i].tipo && medidas[i].talla && medidas[i].medida) {

              const queryMedidas = `INSERT INTO medidas (auditoria_id, talla, tipo, medida)
                  VALUES('${id}', '${medidas[i].talla}', '${medidas[i].tipo}', '${medidas[i].medida}');`

              conn.query(queryMedidas, (error, results) => {
                if (error) throw error
              })
            }
          }
        }

        if (cobros.descripcion_cobros && cobros.cantidad_cobros && cobros.valor_cobros) {
          const queryCobros = `INSERT INTO cobros(auditoria_id, descripcion, cantidad, valor)  
              VALUES(${id}, '${cobros.descripcion_cobros}', '${cobros.cantidad_cobros}', '${cobros.valor_cobros}');`

          conn.query(queryCobros, (error, results) => {
            if (error) throw error
          })
        }

      })

      conn.query('COMMIT;', (error, results) => {
        if (error) throw error
        conn.release()
        res.json({ msj: 'Auditoria Guardada con exito' })
      })

    })

  } catch (error) {
    console.log(error)
  }

})


// esta ruta es para guardar auditorias desde el confeccionista
// rute /auditorias
router.post('/insert-from-confeccionista', verifyTokenConfeccionista, (req, res) => {
  const { auditor, cobros, colaboradores_karibik, composicion, faltantes, faltantesTotal, fecha_auditoria, medidas, muestra_fisica,
    no_conformidades, op, primeras, segundas, tipo_revision, unidades_muestra, aprobado } = req.body

  let id

  try {

    pool.getConnection((err, conn) => {
      if (err) throw err

      conn.query('START TRANSACTION;', (error, results) => {
        if (error) throw error
      })

      const queryAuditoria = `INSERT INTO auditorias (op, fecha_auditoria, composicion, unidades_muestra, muestra_fisica, tipo_revision,
        colaboradores_karibik, auditor, faltantes_totales, segundas_totales, primeras, aprobado)  VALUES ('${op}', '${fecha_auditoria}',
        '${composicion}', '${unidades_muestra}', '${muestra_fisica}', '${tipo_revision}', '${colaboradores_karibik}', '${auditor}',
        '${faltantesTotal}', '${segundas}', '${primeras}', '${aprobado}');`
      conn.query(queryAuditoria, (error, results) => {
        if (error) throw error
        id = results.insertId
      })

      const queryUpdateAuditado = `UPDATE lotes SET auditado = ${true} WHERE op = '${op}';`
      conn.query(queryUpdateAuditado, (error, results) => {
        if (error) throw error

        if (no_conformidades.length > 0) {
          for (let i = 0; i < no_conformidades.length; i++) {
            if (no_conformidades[i].defecto && no_conformidades[i].cantidad) {

              const queryNoConformidades = `INSERT INTO no_conformidades (auditoria_id, defecto, cantidad)
                VALUES(${id}, '${no_conformidades[i].defecto}', '${no_conformidades[i].cantidad}');`

              conn.query(queryNoConformidades, (error, results) => {
                if (error) throw error
              })
            }
          }
        }

        if (faltantes.length > 0) {
          for (let i = 0; i < faltantes.length; i++) {
            if (faltantes[i].talla && faltantes[i].cantidad) {

              const queryFaltantes = `INSERT INTO faltantes (auditoria_id, talla, cantidad)
                  VALUES(${id}, '${faltantes[i].talla}', '${faltantes[i].cantidad}');`

              conn.query(queryFaltantes, (error, results) => {
                if (error) throw error
              })
            }
          }
        }

        if (medidas.length > 0) {
          for (let i = 0; i < medidas.length; i++) {
            if (medidas[i].tipo && medidas[i].talla && medidas[i].medida) {

              const queryMedidas = `INSERT INTO medidas (auditoria_id, talla, tipo, medida)
                  VALUES('${id}', '${medidas[i].talla}', '${medidas[i].tipo}', '${medidas[i].medida}');`

              conn.query(queryMedidas, (error, results) => {
                if (error) throw error
              })
            }
          }
        }

        if (cobros.descripcion_cobros && cobros.cantidad_cobros && cobros.valor_cobros) {
          const queryCobros = `INSERT INTO cobros(auditoria_id, descripcion, cantidad, valor)  
              VALUES(${id}, '${cobros.descripcion_cobros}', '${cobros.cantidad_cobros}', '${cobros.valor_cobros}');`

          conn.query(queryCobros, (error, results) => {
            if (error) throw error
          })
        }

      })

      conn.query('COMMIT;', (error, results) => {
        if (error) throw error
        conn.release()
        res.json({ msj: 'Auditoria Guardada con exito' })
      })

    })


  } catch (error) {
    console.log(error)
  }
})


// esta ruta es para solicitar auditorias
// ruta /auditorias
router.get('/get-export', verifyTokenGeneral, (req, res) => {
  const { criterio, fecha_inicial, fecha_final } = req.query

  try {
    if (criterio === 'Todo') {
      const query = `SELECT * FROM auditorias;`
      pool.getConnection((err, conn) => {
        if (err) throw err
        conn.query(query, (error, results) => {
          if (error) throw error

          if (results) {
            for (let i = 0; i < results.length; i++) {
              const queryFaltantes = `SELECT * FROM faltantes WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryFaltantes, (error, resultsFaltantes) => {
                if (error) throw error
                results[i].faltantes = [...resultsFaltantes]
              })
            }

            for (let i = 0; i < results.length; i++) {
              const queryNoConformidades = `SELECT * FROM no_conformidades WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryNoConformidades, (error, resultsNoConformidades) => {
                if (error) throw error
                results[i].no_conformidades = [...resultsNoConformidades]
              })
            }

            for (let i = 0; i < results.length; i++) {
              const queryMedidas = `SELECT * FROM medidas WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryMedidas, (error, resultsMedidas) => {
                if (error) throw error
                results[i].medidas = [...resultsMedidas]
              })
            }

            for (let i = 0; i < results.length; i++) {
              const queryCobros = `SELECT * FROM cobros WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryCobros, (error, resultsCobros) => {
                if (error) throw error
                results[i].cobros = { ...resultsCobros[0] }

                if (i === results.length - 1) {
                  res.send(results)
                }
    
              })
            }
          }
        })
        conn.release()
      })
    } else if (criterio === 'Rango de fechas') {
      const query = `SELECT * FROM auditorias WHERE fecha_auditoria >= '${fecha_inicial}' AND fecha_auditoria <= '${fecha_final}';`

      pool.getConnection((err, conn) => {
        if (err) throw err
        conn.query(query, (error, results) => {
          if (error) throw error

          if (results) {
            for (let i = 0; i < results.length; i++) {
              const queryFaltantes = `SELECT * FROM faltantes WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryFaltantes, (error, resultsFaltantes) => {
                if (error) throw error
                results[i].faltantes = [...resultsFaltantes]
              })
            }

            for (let i = 0; i < results.length; i++) {
              const queryNoConformidades = `SELECT * FROM no_conformidades WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryNoConformidades, (error, resultsNoConformidades) => {
                if (error) throw error
                results[i].no_conformidades = [...resultsNoConformidades]
              })
            }

            for (let i = 0; i < results.length; i++) {
              const queryMedidas = `SELECT * FROM medidas WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryMedidas, (error, resultsMedidas) => {
                if (error) throw error
                results[i].medidas = [...resultsMedidas]
              })
            }

            for (let i = 0; i < results.length; i++) {
              const queryCobros = `SELECT * FROM cobros WHERE auditoria_id = '${results[i].auditoria_id}';`

              conn.query(queryCobros, (error, resultsCobros) => {
                if (error) throw error
                results[i].cobros = { ...resultsCobros[0] }

                if (i === results.length - 1) {
                  res.send(results)
                }
    
              })
            }
          }
          
        })
        conn.release()
      })
    }
  } catch (error) {
    console.log(error)
  }
})


//para eliminar auditorias
// ruta/auditorias
router.delete('/delete', verifyTokenGeneral, (req, res) => {
  const { auditoria_id, op } = req.query

  try {
    const queryDeleteAuditoria = `DELETE FROM auditorias WHERE auditoria_id = ${auditoria_id};`
    const queryVerifyLoteAuditado = `SELECT * FROM auditorias WHERE op = '${op}';`

    pool.getConnection((err, conn) => {
      if (err) throw err
      conn.query(queryDeleteAuditoria, (error, results) => {
        if (error) throw error

      })

      conn.query(queryVerifyLoteAuditado, (error, results) => {
        if (error) throw error
        if (results.length == 0) {
          const queryUpdateAuditado = `UPDATE lotes SET auditado = ${false} WHERE op = '${op}';`
          conn.query(queryUpdateAuditado, (error, results) => {
            if (error) throw error
            res.json({ msj: 'Auditoria ELiminada' })
          })
        } else {
          res.json({ msj: 'Auditoria ELiminada' })
        }
      })
      conn.release()
    })

  } catch (error) {
    console.log(error)
  }
})


module.exports = router
