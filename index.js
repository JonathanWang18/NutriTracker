const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const search = require("./routes/search.js")
require('dotenv').config()

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/foodsearch', search)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app