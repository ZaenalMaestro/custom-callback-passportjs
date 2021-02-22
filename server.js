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
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      req.flash('error', 'username atau password salah')
      req.flash('username', req.body.username)
      req.flash('password', req.body.password)
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) return next(err)
      return res.redirect('/')
    })
  })(req, res, next)
})

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index', {
    name: req.user.name
  })
})

app.get('/logout', checkAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/')
  next()
}

app.listen(3000, () => console.log('server running on port: 3000'))

