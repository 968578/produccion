const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const lotesController = require('./controller/lotes-controller')
const auditoriasController = require('./controller/auditorias-controller')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/lotes', lotesController)

app.use('/auditorias', auditoriasController)


const port = 3000

app.listen(port, ()=>{
  console.log('puerto '+ port)

})
