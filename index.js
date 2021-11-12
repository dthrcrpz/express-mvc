/* import packages */
const express = require('express')
require('dotenv').config()
const cors = require('cors')

/* initialize express */
const app = express()

/* use packages */
app.use(cors())

/* parse requests of content-type - application/json */
app.use(express.json())

/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }))

/* connect to MySQL */
const db = require('./models/Index')
db.sequelize.sync()

/* import routes */;
app.use(require('./routes/api'))

/* run the application */
const port = process.env.PORT
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
})