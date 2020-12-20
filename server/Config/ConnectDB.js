const mongoose = require("mongoose");
const config = require("config");

const db = config.get("Mongo-URI");

const ConnectDB = () => {
  mongoose.connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      err
        ? console.log("db error", err)
        : console.log("DataBase successfully connected");
    }
  );
};

module.exports = ConnectDB;
