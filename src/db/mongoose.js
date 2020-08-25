// /Users/Kishan/mongodb/bin/mongod.exe --dbpath=/Users/Kishan/mongodb-data

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Successfully Run");
  })
  .catch((e) => {
    console.log(e);
  });
