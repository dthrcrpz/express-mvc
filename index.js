const express = require('express')

require('dotenv').config()

const app = express()

app.use(require('./routes/api'))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
})