const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')

require('dotenv').config()

const authRouter = require('./router/authRouter')
const appRouter = require('./router/appRouter')
const { authorized} = require('./auth/auth')
const passport = require('passport')
const PORT = process.env.PORT || 4567
const app = express()


app.use(logger('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
// Static hosting for built files
app.use(express.static(path.join(__dirname, './client/build')));

app.use('/auth', authRouter)
app.use('/app',  authorized, appRouter)
app.use(passport.initialize())


app.get('/', async (request, response) => {
  try {
    response.json({message: 'Welcome to Express Auth App!'})
  } catch (e) {
    response.status(e.status).json({ message: e.status }) 
  }
})

if (process.env.NODE_ENV == "production") {
  app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
}


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message})
})

 app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))
