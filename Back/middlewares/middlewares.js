const jwt = require('jsonwebtoken')

const verifyToken=(req, res, next)=>{
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token, 'palabraSecreta', (err , data)=>{
    if(err){
      res.send('token invalido')
    }  else{
      req.user = data
      next()
    }
  } )

}

module.exports ={
  verifyToken
}