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
        type: String,
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
        type: String,
        required: true  
    },
    documents: {
        panUrl: { type: String, default: null },
        aadhaarFrontUrl: { type: String, default: null },
        aadhaarBackUrl: { type: String, default: null }
    }
});
module.exports= mongoose.model("User", userSchema);