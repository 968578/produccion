const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()


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
