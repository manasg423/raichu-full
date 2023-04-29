const mongoose = require('mongoose')

const url = "mongodb://manasgogna:Manug423mongo@ac-7eqnscb-shard-00-00.qzg7v5b.mongodb.net:27017,ac-7eqnscb-shard-00-01.qzg7v5b.mongodb.net:27017,ac-7eqnscb-shard-00-02.qzg7v5b.mongodb.net:27017/?ssl=true&replicaSet=atlas-4qqe6l-shard-0&authSource=admin&retryWrites=true&w=majority"

module.exports.connect = () => {
    mongoose
      .connect(url)
      .then(() => console.log("MongoDB is connected successfully"))
      .catch((err) => console.log("Error: ", err));
  };