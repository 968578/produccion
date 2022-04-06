const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()


// agregar auditorias  
//    /auditorias
router.post('/insert', (req,res)=>{
  const {auditor, cobros, colaboradores_karibik, composicion, faltantes, fecha_auditoria, muestra_fisica, no_conformidades, 
          p} = req.body
})


module.exports = router