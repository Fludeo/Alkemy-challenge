require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')

const app = express()

const port = process.env.PORT


const ConfigureDIC = require('./config/DIconfig')
const { initAuthModule } = require('./module/auth/module')
const { initRecordModule } = require('./module/record/module')
const { initUserModule } = require('./module/user/module')

const container = ConfigureDIC()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const defaultController = container.get('DefaultController');
defaultController.configureRoutes(app);
app.use(authenticateToken)
initAuthModule(app,container)
initRecordModule(app,container)
initUserModule(app,container)

/**
 * @type {import('../src/module/auth/module').AuthService} authService
 */


/**
 * @type {import('./module/default/controller/default_controller')} defaultController
 */



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




function  authenticateToken(req,res,next){
  const authHeader = req.authHeader['authorization']
  const token = authHeader && authHeader.split('')[1]
  if(token===null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{

      if(err){return res.sendStatus(403)}
      req.user=user
      next()
  })

}