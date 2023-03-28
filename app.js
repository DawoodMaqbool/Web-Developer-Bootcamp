const Morgan = require('morgan');
const express = require('express');
const dbConnect = require('./mongodb');
const app = express();
const error = require('./Middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

app.use(express.json());
app.use(Morgan('tiny')); //Logger middleware that logs data for all endpoints.
app.use(cookieParser())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
  message: 'You have exceeded the 100 requests in 10 minutes limit!'
});
app.use(limiter);
app.use(hpp())
app.use(cors())

const port = 8080; //defining listening port number

//const getBootcamp = require('./routes/bootcampRoutes');
const getUsers = require('./routes/userRoutes');
app.use('/' , getUsers);
app.use(error);

app.listen(port, () =>{
  console.log("App is listening now"); //confirmation message
  dbConnect();
});
