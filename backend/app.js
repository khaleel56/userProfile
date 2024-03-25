const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const morgan = require('morgan');

const router = require('./router')
require('./utils/database')
const app = express();

const port = process.env.PORT;
const logger = morgan('dev');

app.use(cors())
app.use(helmet());
app.use(express.json({ limit: '16mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/app', router)

app.listen(port, ()=>console.log('server running in port' , port))