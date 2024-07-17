const mongoose = require('mongoose')
const {Schema, model} = mongoose

const User = new Schema({
    username: { type: String, required: true, unique: true },
    password:String
})

module.exports = model('User', User)