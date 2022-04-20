const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()
const {verifyToken} = require('../middlewares/middlewares')


//solicitar lotes    
//  ruta /lotes
router.get('/get', (req,res)=>{
  try {

    const query = 'SELECT * FROM lotes;'

    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(query, (error, results)=>{
        
        if(error) throw error
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
router.get('/op', (req,res)=>{
  
  const {op} = req.query
  
  const queryLotes = `SELECT * FROM lotes WHERE op = '${op}';`
  const queryAuditoria =`SELECT * FROM auditorias WHERE op = '${op}';`
  const queryFaltantes =`SELECT * FROM faltantes WHERE op = '${op}';`
  const queryNo_conformidades =`SELECT * FROM no_conformidades WHERE op = '${op}';`
  const queryMedidas = `SELECT * FROM medidas WHERE op = '${op}';`
  const queryCobros =`SELECT * FROM cobros WHERE op = '${op}';`
  let lote = {}

  try {

    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(queryLotes, (error, results)=>{
        
        if(error) throw error
        lote = { ...results[0]}
      })
      conn.query(queryAuditoria, (error, results)=>{
        
        if(error) throw error
        if(results.length > 0){
          lote.auditoria = { ...results[0]}
        }
      })
      conn.query(queryFaltantes, (error, results)=>{
        
        if(error) throw error
        if(lote.auditoria){
          lote.auditoria.faltantes = [...results] 

        }
      })
      conn.query(queryNo_conformidades, (error, results)=>{
        
        if(error) throw error
        if(lote.auditoria){
          lote.auditoria.segundas = [...results] 

        }
      })
      conn.query(queryMedidas, (error, results)=>{
        
        if(error) throw error
        if(lote.auditoria){
          lote.auditoria.medidas = [...results] 

        }

      })
      conn.query(queryCobros, (error, results)=>{
        
        if(error) throw error
        if(lote.auditoria){
          lote.auditoria.cobros = {...results[0]} 

        }
        res.json(lote)
        conn.release()
      })
    })
    
  } catch (error) {
    console.log(error)
  }
})

router.get ('/nombre', verifyToken,(req,res)=>{

  const nombre = req.user.nombre
  try {
    const query = `SELECT * FROM lotes  WHERE lotes.confeccionista = '${nombre}';`
    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(query, (error, results)=>{

        if (error ) throw error

        return res.json({msj:'Autorizado', lotes: results, nombre })
      })
      conn.release()

    })
  } catch (error) {
    console.log(error)
  }
})

// para agregar lotes   
//  ruta /lotes
router.post('/insert', (req,res)=>{
  const  { op, referencia, tejido, tipo_producto, unidades, sam, estado, confeccionista,
    fecha_asignacion, fecha_entrega, capacidad, ciclo, fecha_probable_entrega, eficiencia, 
      valor_unidad,  modulo, zona  } =  req.body

  try {

    // observacion lo dejo vacio ya que cuando se crea no es necesario una observacion por ahora
    const observacion =''
      
    const query = `INSERT INTO lotes (op, referencia , tejido, tipo_producto, unidades, sam, estado , confeccionista,
      fecha_asignacion, fecha_entrega, capacidad, ciclo, fecha_probable_entrega, eficiencia, valor_unidad ,modulo, zona, observacion ) VALUES 
        ('${op}', '${referencia}', '${tejido}', '${tipo_producto}', '${unidades}', '${sam}', '${estado}', '${confeccionista}',
          '${fecha_asignacion}', '${fecha_entrega}', '${capacidad}', '${ciclo}', '${fecha_probable_entrega}', '${eficiencia}',
            '${valor_unidad}', '${modulo}', '${zona}', '${observacion}');`

    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(query, (error, results)=>{
          
        if(error) {
          if(error.errno === 1062){
            return res.send('¡¡OP ya existe, cambie la OP para que sea unica!!')
          }else throw error
            
        }else{
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
router.put('/update', (req, res)=>{

  const  { op, referencia, tejido, tipo_producto, unidades, sam, estado, confeccionista,
    fecha_asignacion, fecha_entrega, capacidad, ciclo, fecha_probable_entrega, eficiencia, 
      valor_unidad,  modulo, zona  } =  req.body
  
  try {
    const query = `UPDATE lotes SET referencia = '${referencia}', tejido = '${tejido}', tipo_producto = '${tipo_producto}',
      unidades = '${unidades}', sam = '${sam}', estado = '${estado}', confeccionista = '${confeccionista}', 
      fecha_asignacion = '${fecha_asignacion}', fecha_entrega = '${fecha_entrega}', capacidad='${capacidad}', ciclo='${ciclo}',
      fecha_probable_entrega = '${fecha_probable_entrega}', eficiencia= '${eficiencia}', valor_unidad = '${valor_unidad}', 
      modulo = '${modulo}', zona = '${zona}' WHERE op = '${op}'`

    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(query, (error, results)=>{
        if(error) throw error
            
        res.send('Actualizado con exito')
        conn.release()
      })
    })

    
  } catch (error) {
    console.log(error)
  }

})


// este nos sirve para actualizar las observaciones 
// ruta /lotes
router.post('/observacion', (req, res)=>{
  const {observacion , estado, op} = req.body
  try {
    
    const query = `UPDATE lotes SET observacion = '${observacion}', estado = '${estado}' WHERE op ='${op}' `
    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(query, (error, results)=>{
        if(error) throw error

        return res.send('Estado Cambiado con exito')
      })
      conn.release()

    })

  } catch (error) {
    console.log(error)
  }
})


// este nos sirve para eliminar los lotes  
//  ruta /lotes
router.delete('/delete',(req,res)=>{
  const {op} = req.query
  try {
    const query = `DELETE FROM lotes WHERE op = '${op}'`
    pool.getConnection((err, conn)=>{
      if(err) throw err

      conn.query(query, (error, results)=>{
          
        if(error) throw error
        res.send('Eliminado con exito')
        conn.release()
      })
    })

  } catch (error) {
    console.log(error)
  }
})


module.exports = router
