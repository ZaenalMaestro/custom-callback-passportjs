const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const userModel = require('./user')

// fungsi autentikasi yang akan menjadi callback dari LocalStrategy 
const authenticate = (username, password, done) => {
  // mendapatkan data user berdasarkan username
  const user = userModel.findUserByUsername(username)

  // jika username tidak ada didaftar user
  if (!user) return done(null, false, { message: 'Username tidak terdaftar !' })

  // jika passpord yang dinput salah
  else if (password !== user.password) return done(null, false, { message: 'Password salah !' })

  // user berhasi diautentikasi
  return done(null, user)
}

// membuat autentikasi menggunakan username dan password (local-strategy)
passport.use(new LocalStrategy(authenticate))

// menyimpan id user yang telah diatentikasi kedalam session
passport.serializeUser((user, done) => done(null, user.id))

/* 
menyimpan data user yang berhasil di autentikasi kedalam session cookie
- untuk mendapatkan data user, menggunakan req.user
*/ 
passport.deserializeUser((id, done) => done(null, userModel.findUserById(id)))

