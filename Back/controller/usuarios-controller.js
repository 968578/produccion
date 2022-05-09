const { Router } = require('express')
const bcrypt = require('bcryptjs') 

const pool = require('../db.conection')
const router = Router()
const jwt =  require('jsonwebtoken')
require('dotenv').config()

// console.log(process.env.SECRET)



// use este codigo para añadir el admin, auditoria y cedi solo se usara una vez
// toca eliminarlo cuando se desplegue la app para no poder crear usuarios
// router.post('/insertUser',(req,res)=>{
//   const {user_name, password, rol} = req.body
//   try {

//     const salt = bcrypt.genSaltSync(10)
//     const hash = bcrypt.hashSync(password, salt )
    
//     const query =  `INSERT INTO usuarios (user_name, password, rol) VALUES('${user_name}', '${hash}', '${rol}')`

//     pool.getConnection((err, conn) => {
//       if (err) throw err

//       conn.query(query, (error, results) => {
//         if (error) throw error

//       })
//       conn.release()
//     })
//     res.send('oki')
//   } catch (error) {
    
//   }
// })

// esta ruta es para logearse
// ruta /usuarios
router.post('/login',(req,res)=>{
  const {user_name, password} = req.body

  try {
    
    if(user_name && password){

      pool.getConnection(async (err, conn) => {
        if (err) throw err
        const query = `SELECT * FROM usuarios WHERE user_name = '${user_name}';`
        conn.query(query, (error, results) => {
          if (error) throw error

          if(results.length > 0){
            let confirmLogin = bcrypt.compareSync(password, results[0].password)
            if(confirmLogin){
              const token = jwt.sign({nombre:results[0].nombre, rol:results[0].rol}, process.env.SECRET)
              return res.json({msj:'Contraseña correcta', token})
            }else{
              return res.json({msj:'Contraseña Incorrecta'})
            }
          }else{
            res.json({msj:'No estas registrado'})
          }
        })
        conn.release()
      })
    }else{
      res.json({msj:'Faltan Datos'})
    }
  } catch (error) {
    
  }
})



module.exports = router