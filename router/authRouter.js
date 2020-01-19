const express = require('express')
const authRouter = express.Router()
const { passport , jwtSign} = require('../auth/auth.js') 


authRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', async (err, driver, info) => {


    try {
      if (err || !driver) {
        console.log("THERE <----");
        const error = new Error(error)
        return next(error)
      }

      req.login(driver, { session: false }, async (error) => {
        console.log("YO <----");
        if (error) {
          console.log("AAAA <----");
          return next(error)
        }

        const { email, id } = driver;
        const payload = {email, id}
        const token = jwtSign(payload)

        return res.json({ driver, token })
      })
    } catch (error) {
      console.log("BOOM <----");
      return next(error)
    }
  })(req, res, next)
})

authRouter.post('/signup', async (req, res, next) => {
  passport.authenticate('signup' , async (err, driver, info) => {
    try {
      if (err) {
        console.log(info)
        const error = new Error(err)
        error.status = 400
        return next(error)
      }
      if(!driver) {
        let error = new Error(info.message || 'An error occured during sigup')
        error.status = 400
        return next(error)
      }

      const { email, id } = driver
      const payload = { email, id}
      const token = jwtSign(payload)
      const message = JSON.stringify(info)

      return res.json({driver, token, message})

    }catch(e) {
      return next(e)
    }
  }) (req, res, next)
})

module.exports = authRouter