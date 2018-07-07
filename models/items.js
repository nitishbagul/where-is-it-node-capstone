"use strict";

const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        required: false
    },
    place_name: {
        type: String,
        required: false
    },
    area_name: {
        type: String,
        required: false
    },
    category_name: {
        type: String,
        required: false
    },

});

const Items = mongoose.model('Items', itemsSchema);

module.exports = Items;
