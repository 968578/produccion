const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()


// agregar auditorias  
//    /auditorias
router.post('/insert', (req, res) => {
  const { auditor, cobros, colaboradores_karibik, composicion, faltantes, faltantesTotal, fecha_auditoria, medidas, muestra_fisica,
    no_conformidades, op, primeras, segundas, tipo_revision, unidades_muestra } = req.body

  try {

    pool.getConnection(async (err, conn) => {
      if (err) throw err

      conn.query('START TRANSACTION;', (error, results) => {
        if (error) throw error        
      })

      const queryAuditoria = `INSERT INTO auditorias (op, fecha_auditoria, composicion, unidades_muestra, muestra_fisica, tipo_revision,
        colaboradores_karibik, auditor, faltantes_totales, segundas_totales, primeras)  VALUES ('${op}', '${fecha_auditoria}',
        '${composicion}', '${unidades_muestra}', '${muestra_fisica}', '${tipo_revision}', '${colaboradores_karibik}', '${auditor}',
        '${faltantesTotal}', '${segundas}', '${primeras}');`
      conn.query(queryAuditoria, (error, results) => {
        if (error) throw error
      })

      const queryUpdateAuditado = `UPDATE lotes SET auditado = ${true} WHERE op = '${op}';`
      conn.query(queryUpdateAuditado, (error, results) => {
        if (error) throw error 
      })

      if(no_conformidades.length > 0){
        for(let i = 0; i < no_conformidades.length ; i++){
          if(no_conformidades[i].defecto && no_conformidades[i].cantidad ){

            const queryNoConformidades = `INSERT INTO no_conformidades (op, defecto, cantidad)
              VALUES('${op}', '${no_conformidades[i].defecto}', '${no_conformidades[i].cantidad}');`

              conn.query(queryNoConformidades, (error, results) => {
                if (error) throw error
              })
          }
        }
      } 
      
      if(faltantes.length > 0){
          for(let i = 0; i < faltantes.length ; i++){
            if(faltantes[i].talla && faltantes[i].cantidad ){
  
              const queryFaltantes = `INSERT INTO faltantes (op, talla, cantidad)
                VALUES('${op}', '${faltantes[i].talla}', '${faltantes[i].cantidad}');`
  
                conn.query(queryFaltantes, (error, results) => {
                  if (error) throw error
                  
                })
            }
          }
      } 
      
      if(medidas.length > 0){
          for(let i = 0; i < medidas.length ; i++){
            if(medidas[i].tipo && medidas[i].talla && medidas[i].medida ){

              const queryMedidas = `INSERT INTO medidas (op, talla, tipo, medida)
                VALUES('${op}', '${medidas[i].talla}', '${medidas[i].tipo}', '${medidas[i].medida}');`

                conn.query(queryMedidas, (error, results) => {
                  if (error)throw error
                })
            }
          }
      } 
      
      if (cobros.descripcion_cobros && cobros.cantidad_cobros && cobros.valor_cobros){
          const queryCobros = `INSERT INTO cobros(op, descripcion, cantidad, valor)  
              VALUES('${op}', '${cobros.descripcion_cobros}', '${cobros.cantidad_cobros}', '${cobros.valor_cobros}');`

          conn.query(queryCobros, (error, results) => {
            if (error) throw error
          })
      }

      conn.query('COMMIT;', (error, results) => {
        if (error) throw error
        conn.release()    
      })

    })
    res.send('Auditoria Guardada con exito')

  } catch (error) {
    console.log(error)
  }


})


module.exports = router
