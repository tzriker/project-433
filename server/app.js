// Import the express module
const express = require('express');
const cors = require("cors");
const mongoDB = require('./DB/connectDB');
require("dotenv").config()
const mainRouter = require("./Routes/mainRoutes.routes")


// Create an instance of the Express application
const app = express();
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: process.env.URL,
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"]
}))

//Connect to a DataBase
mongoDB(process.env.MONGOURL)
.then(()=>console.log("connected succesfully"))
.catch((error)=>console.log(error))


app.use(mainRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
