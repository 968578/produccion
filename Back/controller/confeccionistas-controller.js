const { Router } = require('express')
const bcrypt = require('bcryptjs') 

const pool = require('../db.conection')
const router = Router()
const jwt =  require('jsonwebtoken')

const {verifyTokenGeneral} = require('../middlewares/middlewares')

require('dotenv').config()


// para solicitar los nombres de los confeccionistas
// ruta /confeccionistas
router.get('/get', verifyTokenGeneral ,(req, res)=>{
  try {
    const query = `SELECT confeccionistas.nombre FROM confeccionistas`
    pool.getConnection(async (err, conn) => {
      if(err) throw err

      conn.query(query, (error, results)=>{
        if(error) throw error

        return res.send(results)
      })
      conn.release()
    })

  } catch (error) {
    console.log(error)
  }
})

// ruta para agregar confeccionistas
// ruta /confeccionistas
router.post('/insert', verifyTokenGeneral ,(req,res)=>{
  const  {nombre, password, a_auditar} = req.body
  let rol
  try {

    if(nombre && password && a_auditar){

      if(a_auditar === 'Si'){
        rol =['Confeccionista', 'Auditoria']
      }else if(a_auditar === 'No'){
        rol = ['Confeccionista']
      }

      let salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt )

      pool.getConnection(async (err, conn) => {
        if (err) throw err
        const query = `INSERT INTO confeccionistas (nombre, password, rol)
        VALUES('${nombre}', '${hash}', '${rol}');`
  
        conn.query(query, (error, results) => {
          if (error){
            if(error.errno === 1062){
              return res.send('Confeccionista ya existe')
            }
            throw error
          } 
          res.send('Confeccionista agregado con exito')
        })
        conn.release()
      })
      // res.send('oki')
    }else{
      res.send('Falta nombre o contraseña')
    }

  } catch (error) {
    console.log(error)
  }
  
})


router.post('/login', (req,res)=>{
  const {nombre, password} = req.body
  console.log(nombre, password)

  try {

    if(nombre && password){

      pool.getConnection(async (err, conn) => {
        if (err) throw err
        const query = `SELECT * FROM confeccionistas WHERE nombre = '${nombre}';`
        conn.query(query, (error, results) => {
          if (error) throw error

          if(results.length > 0){

            let confirmLogin = bcrypt.compareSync(password, results[0].password)
            if(confirmLogin){
              const token = jwt.sign({nombre:results[0].nombre}, process.env.SECRET)
              return res.json({msj:'Contraseña correcta', token, rol:results[0].rol})
            }else{
              return res.send('contraseña incorrecta')
            }
          }else{
            res.send('No estas Registrado')
          }
        })
        conn.release()
  
      })

    }else{
      return res.send('Falta un dato')
    }
    
  } catch (error) {
    console.log(error)
  }
})

//esta ruta es para eliminar un confeccionista
// ruta /confeccioonistas
router.delete('/delete', (req,res)=>{
  const { nombre } = req.query
  try {
    const query = `DELETE FROM confeccionistas WHERE nombre = '${nombre}';`

    pool.getConnection(async (err, conn) => {
      if(err) throw err

      conn.query(query, (error, results)=>{
        if(error) throw error
        res.send('Confeccionista Eliminado con exito')
      })
    })

  } catch (error) {
    
  }
})

module.exports = router
