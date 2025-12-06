const mongoose = require('mongoose');
const userSchema= mongoose.Schema({

    name: {
        type: String,
        required: true  
    },
    phone_number: {
        type: Number,  
        required: true
    },
    password: {
        type: String,
        required: true  
    },
    email: {    
        type: String,
        required: true,
        unique: true,
        index: true
    },
    aadhar: {
        type: Number,
        required: true
    },
    pan: {
        type: Number,
        required: true  
    },
    business_description: {
        type: String,
        required: true
    },
    previous_micro_loans: { 
        numberOfLoans: {
            type: Number,
            required: true
    },  
        totalAmount: {
            type: Number,
            required: true
        },
    
        interest: {
            type: Number,
            required: true
        },
        remainingPayments: {
            type: Number,
            required: true
        }
    },
    gst_number: {
        type: Number,
        required: true  
    }
});
module.exports= mongoose.model("User", userSchema);