const mongoose = require('mongoose')
const { Schema } = mongoose


const serviceSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    cities: [{
       name:{
           type: String,
           required: true
       },
       pincode:{
           type: Number,
           required: true,
           index: true
       }
    }],
    created_by:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('service', serviceSchema)
