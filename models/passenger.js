
module.exports = (db, Sequelize) => {
    return db.define('passenger', {
        name: Sequelize.STRING,
        pickedUpAddress: Sequelize.INTEGER,
        dropOffAddress: Sequelize.INTEGER

    })
}