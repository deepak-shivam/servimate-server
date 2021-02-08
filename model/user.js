const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 20
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    verificationToken:{
        type: String,
        expire_at: {type: Date, default: Date.now, expires: 300}
    },
    phoneNumber: {
        type: Number,
        length: 10
    },
    role:{
        type: String,
        required: true,
        default: "customer"
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('user', userSchema)
