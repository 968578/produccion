const jwt = require('jsonwebtoken')
require('dotenv').config()


// para mostrar los lotes por nombre verifica el token del confeccionista y guarda el 
// nombre en el 'req' para usarlo en la consulta.
const verifyTokenConfeccionista=(req, res, next)=>{
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token, process.env.SECRET, (err , data)=>{
    if(err){
      res.send('token invalido')
    }  else{
      console.log(data)
      req.user = data
      next()
    }
  })

}


// para mostrar los lotes verifica el token de admin, auditoria y cedi
const verifyTokenGeneral=(req,res, next)=>{

  console.log(req.headers['authorization'])
  if(req.headers['authorization']){
    const token = req.headers['authorization'].split(' ')[1]
  
    jwt.verify(token, process.env.SECRET, (err , data)=>{
      if(err){
        res.send('token invalido')
      }  else{
        if(data.rol === 'Admin'|| data.rol === 'Auditoria' || data.rol === 'CEDI'){
          next()
        } else{
          res.send('No tienes permisos')
        }
      }
    })
  }else {
    res.send('No Puedes Acceder')
  }
}

module.exports ={
  verifyTokenConfeccionista,
  verifyTokenGeneral
}