const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const lotesController = require('./controller/lotes-controller')
const auditoriasController = require('./controller/auditorias-controller')
const confeccionistasController = require ('./controller/confeccionistas-controller')
const usuariosController = require('./controller/usuarios-controller')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/lotes', lotesController)

app.use('/auditorias', auditoriasController)

app.use('/confeccionistas', confeccionistasController)

app.use('/usuarios', usuariosController)


const port = 3000

app.listen(port, ()=>{
  console.log('puerto '+ port)

})
