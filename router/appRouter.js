const express = require  ('express')
console.log(express)
const appRouter = express.Router()
const { passport } = require('../auth/auth');
const { Driver, Passanger } = require('../models')


appRouter.get('/profile', passport.authenticate('jwt', { session: false}),
        async(req, res) => {
        res.json({ driver: req.driver, message: 'authenticated'})
    }   
)

//-----------------DRIVER---------------------

// appRouter.get('./driver', async (req, res) => {
//     res.send(await Driver.findAll())
// })

// appRouter.get('/driverId/my-driver', async (req, res) => {
//     res.send(await Driver.findAll({
//         where: {
//             'driverId' : req.params.driverId
//         },
//         include: [
//             {model: Driver}
//         ]
//     }))
// })

// appRouter.get('/driver/:id', async(req, res) =>{
//     let driver = await Driver.findByPk(req.params.id)
//     res.send(driver)
// })



// //-------------passanger----------------

// appRouter.get('./passanger', async (req, res) => {
//     res.send(await Passanger.findAll())
// })

// appRouter.get('/passengerId/my-passenger', async (req, res) => {
//     res.send(await Driver.findAll({
//         where: {
//             'passengerId' : req.params.passengerId
//         },
//         include: [
//             {model: Passenger}
//         ]
//     }))
// })

// appRouter.get('/passenger/:id', async(req, res) =>{
//     let passanger = await Passanger.findByPk(req.params.id)
//     res.send(passanger)
// })


// //----------------RIDE--------------------

// appRouter.get('./ride', async (req, res) => {
//     res.send(await Ride.findAll())
// })

// appRouter.get('/ride/:id', async(req, res) =>{
//     let ride = await Ride.findByPk(req.params.id)
//     res.send(ride)
// })






// appBook.get('./passanger')

module.exports = appRouter