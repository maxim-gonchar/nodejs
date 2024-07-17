const mongoose = require('mongoose')
const {Schema, model} = mongoose

const Task = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    status: String
})

module.exports = model('Task', Task)