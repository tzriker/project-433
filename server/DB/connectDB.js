const mongoose = require('mongoose')

const mongoDB = async (url) => {
    await mongoose.connect(url)
    console.log("Connected to mongoDB");
}

module.exports = mongoDB;