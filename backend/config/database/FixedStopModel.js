const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/circuitapp'); 

// Schema for users
const fixedstopSchema = mongoose.Schema({
    name: String,
    businessName: String,
    mapLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number], // [lng, lat]
            required: true
          }
    },
    status: Number,
    location: String
})

const FixedstopModel = mongoose.model('Fixedstop', fixedstopSchema);

module.exports = FixedstopModel;