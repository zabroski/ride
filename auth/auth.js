const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Driver } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const SECRET = 'suoer long string'

const jwtSign = (payload) =>{
    return jwt.sign(payload, process.env.SECRET)
}

passport.use(new JWTStrategy({
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async(token, done) => {
    try {
        const driver = await Driver.findByPk(token.id)

        if(driver) {
            done(null, driver)
        }
        else {
            done(null. false)
        }

    } catch(e) {
        done(error)
    }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // find user by their email
    var driver = await Driver.findOne({ where: { email: email }})
    console.log(driver)
    console.log(`*** user: ${driver} ***`)

    if (!driver) {
      return done(null, false, { message: 'User not found'})
    }


    // compare passwords
    const validate = await bcrypt.compare(password, driver.password);
    console.log(`*** validate: ${validate} ***`)
    console.log(password, driver.password)

    if (!validate) {
      return done(null, false, { message: 'Wrong password'})
    }

    // login was a success, return the user object
    return done(null, driver, { message: 'Logged in successfully'})

  } catch(error) {
    return done(error)
  }
}))

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        console.log(req)
        const { body: { name } } = req

        const user = await Driver.create({
            name: name,
            email: email,
            password: password
        })

        if(!user) {
            return done(null, false, {message: 'User not a user'})
        }
        done(null, user, {message: 'User suucessfuly created'})

    } catch(e) {
        done(e)

    }
}))

const authorized = (request, response, next) => {
    passport.authenticate('jwt', { session: false }, async (error, user) => {
      if (error || !user) {
        // response.status(401).json({ message: 'Unauthorized' });
        let err = new Error('No sccess allowed')
        err.status = 401
        return next(err)
      }

      request.user = user
      return next()
    })(request, response, next)
  }

module.exports = {
  passport, jwtSign, authorized
}