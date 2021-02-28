const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const userModel = require('./user')

// fungsi autentikasi yang akan menjadi callback dari LocalStrategy 
const authenticate = (username, password, done) => {
  // mendapatkan data user berdasarkan username
  const user = userModel.findUserByUsername(username)
  return done(null, user)
}

passport.use(new LocalStrategy(authenticate))
passport.serializeUser((user, done) => done(null, user.id))

/* 
menyimpan data user yang berhasil di autentikasi kedalam session cookie
- untuk mendapatkan data user, menggunakan req.user
*/ 
passport.deserializeUser((id, done) => done(null, userModel.findUserById(id)))

