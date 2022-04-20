const { Router } = require('express')
const bcrypt = require('bcryptjs') 

const pool = require('../db.conection')
const router = Router()
const jwt =  require('jsonwebtoken')



// para solicitar los nombres de los confeccionistas
// ruta /confeccionistas
router.get('/get', (req, res)=>{
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


router.post('/insert', (req,res)=>{
  const  {nombre, password} = req.body
  try {
    if(nombre && password){

      let salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt )

      pool.getConnection(async (err, conn) => {
        if (err) throw err
        const query = `INSERT INTO confeccionistas (nombre, password)
        VALUES('${nombre}', '${hash}');`
  
        conn.query(query, (error, results) => {
          if (error){
            if(error.errno === 1062){
              return res.send('confeccionista ya existe')
            }
            throw error
          } 
          res.send('Confeccionista agregado con exito')
        })
        conn.release()
      })
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
              const token = jwt.sign({nombre:results[0].nombre}, 'palabraSecreta')
              return res.json({msj:'Contraseña correcta', token})
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

module.exports = router
