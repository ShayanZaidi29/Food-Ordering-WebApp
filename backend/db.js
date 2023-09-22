const mongoose = require('mongoose');
// 'mongodb+srv://shayan:mern123@cluster0.eoqypvr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
const mongoURL = "mongodb://127.0.0.1:27017/FoodWow"
const mongoDB =() => {
    mongoose.connect(mongoURL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log("error ala "+err.message));

}

module.exports = mongoDB;