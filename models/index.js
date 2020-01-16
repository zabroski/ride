const Sequelize = require('sequelize')
const UserModel = require('./user')
const bcrypt = require('bcrypt')

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

module.exports = {
  db,
  User
}
