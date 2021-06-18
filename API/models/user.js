const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: { type: String, required: true },
    alerts: [],
    history: []
})

const User = mongoose.model('User', userSchema)
module.exports = User;