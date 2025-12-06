const express= require('express');





const app= express();
app.use(express.json());
app.use("/microfinance/user",require("./routes/userRoutes"));
 app.listen(3000,()=> {
    console.log("Server started on port 3000");
 })