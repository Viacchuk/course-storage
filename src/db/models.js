const sequelize = require('./database.connector');
const {DataTypes} = require('sequelize');

const History = sequelize.define('history', {
    course: {type: DataTypes.DOUBLE},
    time: {type: DataTypes.DATE}
})

const Interval = sequelize.define('interval', {
    interval: {type: DataTypes.INTEGER}
})

module.exports = {
    History, Interval
}