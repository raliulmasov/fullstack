// models/person.js

const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 1
    }
});

// export the Person model
module.exports = mongoose.model('Person', personSchema);
