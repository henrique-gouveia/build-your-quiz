require('dotenv').config()

const app = require('express')()
const consign = require('consign')

const db = require('./config/db')

app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./assertions.js')
    .then('./resources')
    .then('./config/routes.js')
    .into(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Build Your Quiz Api is Running on port ${port}...`)
})
