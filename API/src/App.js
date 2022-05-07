/* eslint-disable no-unused-vars */
require('dotenv').config()

const express = require('express')

const app = express()

const port = process.env.PORT


const ConfigureDIC = require('./config/DIconfig')
const { initAuthModule } = require('./module/auth/module')
const { initRecordModule } = require('./module/record/module')
const { initUserModule } = require('./module/user/module')

// DIcontainer initialization

  const container = ConfigureDIC()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes initialization 

  initAuthModule(app,container)
  initRecordModule(app,container)
  initUserModule(app,container)


app.use(function (err,req,res,next){
 
  res.status(500)
  res.json({message:err.message})

})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


