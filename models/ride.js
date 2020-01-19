
module.exports = (db, Sequelize) => {
    return db.define('ride', {
        confirmPickUp: Sequelize.STRING,
        confirmDropOff: Sequelize.STRING
    })
}