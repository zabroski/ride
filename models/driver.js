
module.exports = (db, Sequelize) => {
    return db.define('driver', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        plate: Sequelize.INTEGER,
        phone: Sequelize.INTEGER,
        driverlicenceNumber: Sequelize.INTEGER
    })
}