require('dotenv').config()
const express = require('express')
const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT







app.get('/', (req, res) => {
  res.send('Hello World!')
})







app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

