const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require('mongoose');
const authController = require('./controller/auth.js');
global.functions = require('./common/functions.js');


const APP_PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI,
  {
    autoIndex: false,
    useNewUrlParser: true,
  }
).then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log("Database error ::", error);
});

//Routes Imported
const auth = require("./routes/auth");
const user = require("./routes/user")


app.get('/', function (req, res) {
  res.send('Hello from Node Demo Project');
});

app.use("*", verifyAuth);
app.use('/auth', auth);
app.use("/user", user);


app.use((req, res) => {
  res.status(404).send({
    message: "Request Path Does Not Exist"
  })
});

app.use((err, req, res, next) => {
  const status = err.status ? err.status : 400;
  const message = err.message ? err.message : 'Server Internal Error';
  res.status(status).send(message);
});

function verifyAuth(req, res, next) {
  try {
    const url = req.originalUrl;
    const isReqExcludedToken = url.match(/auth/gi);
    if ((!isReqExcludedToken)) {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized request.' });
      } else {
        const value = authController.verifyToken(req.headers.authorization, next);
        req['user'] = value;
        return next();
      }
    } else {
      return next();
    }
  } catch (error) {
    return next({ status: 400, message: error });
  }
}

app.listen(APP_PORT, () => {
  console.log('Node Demo Project server listening on ', APP_PORT);
})


