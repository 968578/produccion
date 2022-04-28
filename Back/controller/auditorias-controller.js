const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()
const { verifyTokenGeneral, verifyTokenConfeccionista } = require('../middlewares/middlewares')

// agregar auditorias  
//    /auditorias
router.post('/insert',verifyTokenGeneral, (req, res) => {
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
        res.send('Auditoria Guardada con exito')
      })

    })


  } catch (error) {
    console.log(error)
  }

})



// esta ruta es para guardar auditorias desde el confeccionista
// rute /auditorias
router.post('/insert-from-confeccionista', verifyTokenConfeccionista ,(req,res)=>{
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
        res.send('Auditoria Guardada con exito')
      })

    })


  } catch (error) {
    console.log(error)
  }
})



//para eliminar auditorias
// ruta/auditorias
router.delete('/delete', verifyTokenGeneral ,(req, res) => {
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
        if(results.length == 0){
          const queryUpdateAuditado = `UPDATE lotes SET auditado = ${false} WHERE op = '${op}';`
          conn.query(queryUpdateAuditado, (error, results) => {
            if (error) throw error
            res.send('Auditoria ELiminada')  
          })
        }else{
          res.send('Auditoria ELiminada')
        }
      })
      conn.release()
    })

  } catch (error) {
    console.log(error)
  }
})


module.exports = router
