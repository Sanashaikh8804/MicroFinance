const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//create new name
const createUser=  asyncHandler(async (req, res) => {
    console.log ("req body is", req.body);
    const { name, phone_number, password, email, aadhar, pan, business_description, previous_micro_loans, gst_number } = req.body;
    
    if (!name || !phone_number || !password || !email || !aadhar || !pan || !business_description || !previous_micro_loans || !gst_number) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        phone_number,
        password,
        email,
        aadhar,
        pan,
        business_description,
        previous_micro_loans,
        gst_number,
    });
    if (user) { 
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phone_number: user.phone_number,
            email: user.email,
            aadhar: user.aadhar,
            pan: user.pan,
            business_description: user.business_description,
            previous_micro_loans: user.previous_micro_loans,
            gst_number: user.gst_number,
        });
    }
    else {
        res.status(400);
        throw new Error("User not found");
    }
});

module.exports= { createUser };

