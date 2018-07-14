const User = require('./models/user');
const Entry = require('./models/entry');
const Items = require('./models/items');
const Places = require('./models/places');
const Areas = require('./models/areas');
const Categories = require('./models/categories');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {

    //take the name, username and the password from the ajax api call
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();
    email = email.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {

            //display it
            return res.status(500).json({
                message: 'Error creating encryption key'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the ncrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Password encryption failed'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                email,
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'New user creation failed'
                    });
                }
                //if creating a new user in the DB is succefull
                if (item) {

                    //display the new user
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/login', function (req, res) {

    //take the username and the password from the ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //using the mongoose DB schema, connect to the database and the user with the same username as above
    User.findOne({
        username: username
    }, function (err, items) {

        //if the there is an error connecting to the DB
        if (err) {

            //display it
            return res.status(500).json({
                message: "Failed to connect to database"
            });
        }
        // if there are no users with that username
        if (!items) {
            //display it
            return res.status(401).json({
                message: "No username found!"
            });
        }
        //if the username is found
        else {

            //try to validate the password
            items.validatePassword(password, function (err, isValid) {

                //if the connection to the DB to validate the password is not working
                if (err) {

                    //display error
                    console.log('Could not connect to the DB to validate the password.');
                }

                //if the password is not valid
                if (!isValid) {

                    //display error
                    return res.status(401).json({
                        message: "Password Invalid"
                    });
                }
                //if the password is valid
                else {
                    //return the logged in user
                    console.log(`User \`${username}\` logged in.`);
                    return res.json(items);
                }
            });
        };
    });
});


//----------------Items Endpoints-------------
//POST
// creating a new item
app.post('/items/create', (req, res) => {
    let itemName = req.body.itemName;
    let placeName = req.body.placeName;
    let areaName = req.body.areaName;
    let categoryName = req.body.categoryName;
    let loggedInUserName = req.body.loggedInUserName;
    let loggedInUserId = req.body.loggedInUserId;
    let creationDate = new Date();

    Items.create({
        itemName,
        placeName,
        areaName,
        creationDate,
        categoryName,
        loggedInUserName,
        loggedInUserId
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });

});

//PUT
//Moving existing Item
app.put('/items/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = "Id in the request and body should match"
        console.error(message);
        return res.status(400).json({
            message: message
        });
    }

    const toUpdate = {};
    const updateableFields = ['placeName', 'areaName', 'categoryName'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Items
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate,
            $set: {
                lastUpdated: new Date()
            }
        })
        .then(items => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Inernal server error'
        }));
});

// GET
// all items by user
app.get('/items/:user', function (req, res) {

    Items
        .find()
        .then(function (items) {
            let itemsOutput = [];
            items.map(function (item) {
                if (item.loggedInUserName == req.params.user) {
                    itemsOutput.push(item);
                }
            });
            res.json({
                itemsOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//all items by userID
app.get('/items/get/all/:id', function (req, res) {

    Items
        .find()
        .then(function (items) {
            let itemsOutput = [];
            items.map(function (item) {
                if (item.loggedInUserId == req.params.id) {
                    itemsOutput.push(item);
                }
            });
            res.json({
                itemsOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// Geting Item by ID
app.get('/item/:id', function (req, res) {
    Items
        .findById(req.params.id).exec().then(function (item) {
            return res.json(item);
        })
        .catch(function (items) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// Geting Item by Name-Search
app.get('/items-search/:itemName/:id', function (req, res) {

    Items
        .find({
            itemName: {
                $regex: `.*${req.params.itemName}.*`,
                $options: "i"
            }
        })
        .then(function (items) {
            let itemsOutput = [];
            items.map(function (item) {
                if (item.loggedInUserId == req.params.id) {
                    itemsOutput.push(item);
                }
            });
            res.json({
                itemsOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});


//DELETE
app.delete('/item/:id', function (req, res) {
    Items.findByIdAndRemove(req.params.id).exec().then(function (item) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});



//----------------Places Endpoints-------------
//POST
// creating a new Place
app.post('/places/create', (req, res) => {
    let placeName = req.body.placeName;
    let areaName = req.body.areaName;
    let areaId = req.body.areaId;
    let loggedInUserName = req.body.loggedInUserName;
    let loggedInUserId = req.body.loggedInUserId;
    let creationDate = new Date();

    Places.create({
        placeName,
        areaName,
        areaId,
        loggedInUserName,
        loggedInUserId,
        creationDate
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });

});


//PUT
//Moving existing Place
app.put('/places/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = "Id in the request and body should match"
        console.error(message);
        return res.status(400).json({
            message: message
        });
    }

    const toUpdate = {};
    const updateableFields = ['areaName'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Places
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate,
            $set: {
                lastUpdated: new Date()
            }
        })
        .then(places => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Inernal server error'
        }));
});

// GET
// all places by user
app.get('/places/:user', function (req, res) {

    Places
        .find()
        .then(function (places) {
            let placesOutput = [];
            places.map(function (place) {
                if (place.loggedInUserName == req.params.user) {
                    placesOutput.push(place);
                }
            });
            res.json({
                placesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//all places by userID
app.get('/places/get/all/:id', function (req, res) {

    Places
        .find()
        .then(function (places) {
            let placesOutput = [];
            places.map(function (place) {
                if (place.loggedInUserId == req.params.id) {
                    placesOutput.push(place);
                }
            });
            res.json({
                placesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//all places by areaID
app.get('/places/get/all/:id/:areaId', function (req, res) {

    Places
        .find()
        .then(function (places) {
            let placesOutput = [];
            places.map(function (place) {
                if (place.loggedInUserId == req.params.id && place.areaId == req.params.areaId) {
                    placesOutput.push(place);
                }
            });
            res.json({
                placesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// Geting Place by ID
app.get('/place/:id', function (req, res) {
    Places
        .findById(req.params.id).exec().then(function (place) {
            return res.json(place);
        })
        .catch(function (places) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// Geting Place by Name-Search
app.get('/places-search/:placeName/:id', function (req, res) {

    Places
        .find({
            placeName: {
                $regex: `.*${req.params.placeName}.*`,
                $options: "i"
            }
        })
        .then(function (places) {
            let placesOutput = [];
            places.map(function (place) {
                if (place.loggedInUserId == req.params.id) {
                    placesOutput.push(place);
                }
            });
            res.json({
                placesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//DELETE
app.delete('/place/:id', function (req, res) {
    Places.findByIdAndRemove(req.params.id).exec().then(function (place) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

//----------------Areas Endpoints-------------
//POST
// creating a new Area
app.post('/areas/create', (req, res) => {
    let areaName = req.body.areaName;
    let loggedInUserName = req.body.loggedInUserName;
    let loggedInUserId = req.body.loggedInUserId;
    let creationDate = new Date();

    Areas.create({
        areaName,
        loggedInUserName,
        loggedInUserId,
        creationDate
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });

});

// GET
// all Areas by user
app.get('/areas/:user', function (req, res) {

    Areas
        .find()
        .then(function (areas) {
            let areasOutput = [];
            areas.map(function (area) {
                if (area.loggedInUserName == req.params.user) {
                    areasOutput.push(area);
                }
            });
            res.json({
                areasOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//Get all areas by userID
app.get('/areas/get/all/:id', function (req, res) {

    Areas
        .find()
        .then(function (areas) {
            let areasOutput = [];
            areas.map(function (area) {
                if (area.loggedInUserId == req.params.id) {
                    areasOutput.push(area);
                }
            });
            res.json({
                areasOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//DELETE
app.delete('/area/:id', function (req, res) {
    Items.findByIdAndRemove(req.params.id).exec().then(function (area) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});



//----------------Categories Endpoints-------------
//POST
// creating a new Category
app.post('/categories/create', (req, res) => {
    let categoryName = req.body.categoryName;
    let loggedInUserName = req.body.loggedInUserName;
    let creationDate = new Date();

    Categories.create({
        categoryName,
        loggedInUserName,
        creationDate
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });

});

// GET
// all Categories by user
app.get('/categories/:user', function (req, res) {

    Categories
        .find()
        .then(function (categories) {
            let categoriesOutput = [];
            categories.map(function (category) {
                if (category.loggedInUserName == req.params.user) {
                    categoriesOutput.push(category);
                }
            });
            res.json({
                categoriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//DELETE
app.delete('/category/:id', function (req, res) {
    Items.findByIdAndRemove(req.params.id).exec().then(function (category) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});






// -------------entry ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new Entry
app.post('/entry/create', (req, res) => {
    let entryType = req.body.entryType;
    let inputDate = req.body.inputDate;
    let inputPlay = req.body.inputPlay;
    let inputAuthor = req.body.inputAuthor;
    let inputRole = req.body.inputRole;
    let inputCo = req.body.inputCo;
    let inputLocation = req.body.inputLocation;
    let inputNotes = req.body.inputNotes;
    let loggedInUserName = req.body.loggedInUserName;

    Entry.create({
        entryType,
        inputDate,
        inputPlay,
        inputAuthor,
        inputRole,
        inputCo,
        inputLocation,
        inputNotes,
        loggedInUserName
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/entry/:id', function (req, res) {
    let toUpdate = {};
    //    let updateableFields = ['achieveWhat', 'achieveHow', 'achieveWhen', 'achieveWhy']; //<--Marius? 'entryType
    let updateableFields = ['entryType', 'inputDate', 'inputPlay', 'inputAuthor', 'inputRole', 'inputCo', 'inputLocation', 'inputNotes', 'loggedInUserName'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    //    console.log(toUpdate);
    Entry
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's entries
app.get('/entry-date/:user', function (req, res) {

    Entry
        .find()
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-read/:user', function (req, res) {

    Entry
        .find({
            "entryType": "read"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-seen/:user', function (req, res) {

    Entry
        .find({
            "entryType": "seen"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-performed/:user', function (req, res) {

    Entry
        .find({
            "entryType": "performed"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single achievement by id
app.get('/entry/:id', function (req, res) {
    Entry
        .findById(req.params.id).exec().then(function (entry) {
            return res.json(entry);
        })
        .catch(function (entries) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting an achievement by id
app.delete('/entry/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
