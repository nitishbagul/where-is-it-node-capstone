"use strict";

const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    category_name: {
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

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
