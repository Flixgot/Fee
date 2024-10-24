const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie-booking');

const userSchema = mongoose.Schema({
    Username: String,
    email: String,
    password: String,
    bookedSeats: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('user', userSchema);