const Mongoose = require('mongoose')
const User = Mongoose.Schema({
    _id: {
        type: String,
        required: true
    }
})

module.exports = Mongoose.model('Userawdawd', User) 
