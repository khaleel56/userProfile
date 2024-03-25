const express = require('express');
const multer = require('multer');

const router = express();

// const upload = multer({ dest: 'uploads/' }); 
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
// const redisMiddleware = require('../middleware/redis')

const employeeController = require('../controllers/employeeController')

router.post('/registration', employeeController.registration );
// router.delete('/delete', userController.delete );
// router.post('/update', userController.update );
router.get('/get', employeeController.get )

router.post('/saveDocument', employeeController.saveDocument)

router.get('/getDocument', employeeController.getDocument)

module.exports = router;
