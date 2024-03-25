const express = require('express');
const router = express.Router()

const employeeRoutes = require('./routes/employeeRoutes')

router.use('/user', employeeRoutes)
module.exports = router;