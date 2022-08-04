const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/circuitapp'); 

// Schema for users
const fixedstopSchema = mongoose.Schema({
    name: String,
    bname: String,
    latitude: String,
    longitude: String,
    status:String,
    location: String
})

const FixedstopModel = mongoose.model('Fixedstop', fixedstopSchema);

module.exports = FixedstopModel;