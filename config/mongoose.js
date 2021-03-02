
const mongoose = require('mongoose')
let config = require('config')
const dbConnection = config.DBHost
try{
   mongoose.connect(dbConnection,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
   }), console.log(`mongodb connected @ ${dbConnection}`)
    const connection = mongoose.connection;

    connection.once("open", function() {
     console.log("MongoDB database connection established successfully");
    });
}
catch(err){
    throw err
}