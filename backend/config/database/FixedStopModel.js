const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/circuitapp'); 

// Schema for users
const fixedstopSchema = mongoose.Schema({
    location: String
})

const fixedstopModel = mongoose.model('Fixedstop', fixedstopSchema);

module.exports = fixedstopModel;