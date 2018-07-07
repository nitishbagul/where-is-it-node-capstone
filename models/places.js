"use strict";

const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    place_name: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        required: false
    },
    loggedInUserName: {
        type: String,
        required: false
    }

});

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;
