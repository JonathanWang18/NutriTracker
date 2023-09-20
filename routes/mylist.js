require('dotenv').config()
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, reply) => {
    reply.sendFile(path.join(__dirname, '../views/mylist.html'));
})

module.exports = router