const { Sequelize } = require('sequelize');
require('dotenv').config();

class dbconnection {
  constructor() {
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_TYPE
    });

    this.#authenticate();
  }
  async #authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  getDatabaseConnection(){
    return this.sequelize
  }

  async closeDatabaseConnection() {
    try {
      await this.sequelize.close()
      console.log('Connection has been closed successfully.');
    } catch (error) {
      console.error('Unable to close the database:', error);
    }
  }
}

module.exports = { dbconnection }