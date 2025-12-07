require('dotenv').config();

const express = require('express');
const cors = require("cors");
const connectDb = require('./config/dbConnection');
const errorHandler = require('./Middleware_/errorHandler');
const nbfcRoutes = require('./routes/nbfcRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect MongoDB
connectDb();

const app = express();

// Parse JSON FIRST
app.use(cors());
app.use(express.json());

app.use("/microfinance/user",require("./routes/userRoutes"));
app.use("/microfinance/getLoan",require("./routes/getLoan"));
app.use("/microfinance/availableSchemes",require("./routes/availableSchemesRoutes"));
app.use("/microfinance/reviewApplications",require("./routes/reviewApplications"));



// Routes

app.use('/api/nbfc', nbfcRoutes);

// Error handler LAST
app.use(errorHandler);

// Start server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
