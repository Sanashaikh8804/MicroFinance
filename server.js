const express= require('express');
const connectDb= require('./config/dbConnection');
const { error } = require('pdf-lib');
const errorHandler = require('./Middleware_/errorHandler');
require('dotenv').config();

connectDb();





const app= express();
app.use(errorHandler);
app.use(express.json());
app.use("/microfinance/user",require("./routes/userRoutes"));
 app.listen(3000,()=> {
    console.log("Server started on port 3000");
 })