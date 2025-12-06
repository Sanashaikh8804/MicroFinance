const mongoose = require('mongoose');
const userSchema= mongoose.Schema({
    aadhar: {
        type: integer,
        required: true
    },
    pan: {
        type: intege,
        required: true  
    },
    business_description: {
        type: String,
        required: true
    },
    previous_micro_loans: { 
        type: intege,
        required: true
    },  
    gst_number: {
        type: integer,
        required: true  
    }
});
module.exports= mongoose.model("User", userSchema);