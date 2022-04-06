const { Router } = require('express')

const pool = require('../db.conection')
const router = Router()


// agregar auditorias  
//    /auditorias
router.post('/insert', (req,res)=>{
  const auditoria= {auditor, cobros, colaboradores_karibik, composicion, faltantes, faltantesTotal,  fecha_auditoria, muestra_fisica, no_conformidades, 
          primeras, segundas, tipo_revision, unidades_muestra} = req.body
      
      console.log(auditoria)
      // console.log(req.body)

    res.send('listo')
})


module.exports = router
