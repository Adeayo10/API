const mongoose = require("mongoose");
const debug = require("debug")("app:database")
const server = "127.0.0.1:27017";
const database = "bookAPI"

class Database{
    constructor(){
        this._connect()
    }
    _connect() {
        mongoose
          .connect(`mongodb://${server}/${database}`)
          .then(() => {
            debug('Database connection successful');
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            debug(`atabase connection error is ${err}`);
        });
    }
}
module.exports = new Database();
