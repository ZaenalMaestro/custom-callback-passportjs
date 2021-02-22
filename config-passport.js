const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const userModel = require('./user')

const authenticate = (username, password, done) => {
  const user = userModel.findUserByUsername(username)
  return done(null, user)
}

passport.use(new LocalStrategy(authenticate))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, userModel.findUserById(id)))

