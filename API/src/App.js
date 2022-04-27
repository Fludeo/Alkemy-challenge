require('dotenv').config()
const express = require('express')

const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT


const ConfigureDIC = require('./config/DIconfig')
const { initRecordModule } = require('./module/record/module')

const container = ConfigureDIC()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initRecordModule(app,container)


/**
 * @type {import('./module/default/controller/default_controller')} defaultController
 */

const defaultController = container.get('DefaultController');
defaultController.configureRoutes(app);

// eslint-disable-next-line no-unused-vars
app.use(function (err,req,res,next){

  res.status(500)
  res.json({
    error:err,
    message: err.message
  })

})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

