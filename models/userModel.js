const mongoose = require('mongoose');
const userSchema= mongoose.Schema({

    name: {
        type: String,
        required: true  
    },
    phone_number: {
        type: integer,  
        required: true
    },
    password: {
        type: String,
        required: true  
    },
    email: {    
        type: String,
        required: true  
    },
    aadhar: {
        type: integer,
        required: true
    },
    pan: {
        type: integer,
        required: true  
    },
    business_description: {
        type: String,
        required: true
    },
    previous_micro_loans: { 
        numberOfLoans: {
            type: integer,
            required: true
    },  
        totalAmount: {
            type: integer,
            required: true
        },
    
        interest: {
            type: Number,
            required: true
        },
        remainingPayments: {
            type: integer,
            required: true
        }
    },
    gst_number: {
        type: integer,
        required: true  
    }
});
module.exports= mongoose.model("User", userSchema);