const express = require('express');
const router  = require('./routes/index');
const app = express()
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  cookie:{
    secure:false,
    sameSite:true //untuk security dari crsf
  } ///https
}))
app.use ('/',router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
