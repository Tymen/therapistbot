const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

class dbConnection {
  constructor() {
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_TYPE,
      logging: false
    });

    this.#authenticate();

    this.db = {}

    this.db.Sequelize = Sequelize;
    this.db.Sequelize.logging = false;
    this.db.sequelize = this.sequelize;

    this.db.safeChatUsers = require('./src/models/safeChatUserModel')(this.sequelize, DataTypes)
  }

  async migrateDB() {
    try {
      this.db.sequelize.sync({ force: false })
    } catch (err) {
      console.log(err)
    }
  }

  async #authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log('Connected to database!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  getDB(){
    return this.db
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

module.exports = { dbConnection }