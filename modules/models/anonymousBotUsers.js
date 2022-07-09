const Sequelize = require("sequelize")
const { dbconnection } = require('./database')

let DB = await new dbconnection();

const anonymousBotUser = DB.define("anonymousBotUser", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dc_UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    channelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    staffUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})