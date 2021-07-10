const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

function connectDb() {
    mongoose.connect(MONGO_URI, options)
        .then(() => console.log('Connected database'))
        .catch(() => console.log(err));
}

module.exports = connectDb;