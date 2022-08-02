const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/circuitapp'); 

// Schema for users
const locationSchema = mongoose.Schema({
    location: String
})

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;