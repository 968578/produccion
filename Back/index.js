const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const lotesController = require('./controller/lotes-controller')


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/', lotesController)


const port = 3000

app.listen(port, ()=>{
  console.log('puerto '+ port)

})
