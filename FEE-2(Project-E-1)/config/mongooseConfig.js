const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`${config.get('MONGODB_URL')}/movie-booking`).then(() => {
    console.log('Connected to MongoDB...');
}).catch(err => {
    console.log(err);
});