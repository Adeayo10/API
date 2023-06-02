const mongoose = require("mongoose");
const debug = require("debug")("app:database");
const server = "127.0.0.1:27017";
const database = "bookAPI";
const testDatabase = "bookAPI_Test"

class Database {
  constructor() {

  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        debug("Database connection successful");
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        debug(`Database connection error is ${err}`);
      });
  }
  _test(){
    mongoose
    .connect(`mongodb://${server}/${testDatabase}`)
    .then(() => {
      debug("Database connection successful");
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      debug(`dtabase connection error is ${err}`);
    });
  }

}
module.exports = new Database();
