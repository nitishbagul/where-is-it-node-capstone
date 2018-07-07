"use strict";

const mongoose = require('mongoose');

const areasSchema = new mongoose.Schema({
    area_name: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        required: false
    },

});

const Areas = mongoose.model('Areas', areasSchema);

module.exports = Areas;
