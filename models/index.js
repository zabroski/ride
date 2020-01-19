const Sequelize = require('sequelize')
const UserModel = require('./user')
const bcrypt = require('bcrypt')
const DiverModel = require('./driver')
const PassangerModel = require('./passenger')
const RideModel = require('./ride')


// connection to the database
const db = new Sequelize({
  database: "express_auth_db_ride",
  dialect: 'postgres'
})

const User = UserModel(db, Sequelize);
// User.hasMany()



User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword
})

const Passenger = PassangerModel(db, Sequelize);
const Driver = DiverModel(db, Sequelize);
const Ride = RideModel(db, Sequelize)


// Ride.belongsTo(Driver),
Driver.hasMany(Ride),
Passenger.hasMany(Ride)




module.exports = {
  db,
  User,
  Driver,
  Passenger
}
