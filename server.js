const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./Middleware_/errorHandler');
const nbfcRoutes = require('./routes/nbfcRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Connect MongoDB
connectDb();

const app = express();

// Parse JSON FIRST
app.use(express.json());

app.use("/microfinance/user",require("./routes/userRoutes"));
app.use("/microfinance/getLoan",require("./routes/getLoan"));



// Routes

app.use('/api/nbfc', nbfcRoutes);

// Error handler LAST
app.use(errorHandler);

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
