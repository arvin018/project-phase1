const express = require('express');
const router  = require('./routes/index');
const app = express()
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.use ('/',router)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})