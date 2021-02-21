const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
require('./config-passport')

// set up view engine
app.set('view engine', 'ejs')

// inisialisasi passport js
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
  secret: 'top-secret',
  saveUninitialized: false,
  resave: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => console.log('server running on port: 3000'))

