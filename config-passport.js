const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const userModel = require('./user')

const authenticate = (username, password, done) => {
  const user = userModel.findUserByUsername(username)

  if (!user) return done(null, false, { message: 'Username tidak terdaftar !' })
  else if (password !== user.password) return done(null, false, { message: 'Password salah !' })

  return done(null, user)
}


passport.use(new LocalStrategy(authenticate))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, userModel.findUserById(id)))

