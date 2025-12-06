const express= require('express');
const connectDb= require('./config/dbConnection');
const errorHandler = require('./Middleware_/errorHandler');
require('dotenv').config();

connectDb();





const app= express();
app.use(express.json());
app.use("/microfinance/user",require("./routes/userRoutes"));

// register error handler after routes
app.use(errorHandler);

app.listen(5001,()=> {
   console.log("Server started on port 5001");
});

