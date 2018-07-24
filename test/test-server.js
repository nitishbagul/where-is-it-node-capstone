/*const {
    app,
    runServer,
    closeServer
} = require('../server');

var chai = require('chai');

var chaiHttp = require('chai-http');

var items = require('../models/items.js');
var places = require('../models/places.js');
var areas = require('../models/areas.js');
var categories = require('../models/categories.js');

var should = chai.should();

chai.use(chaiHttp);

describe('where-is-it-node-capstone', function () {
    it('should add an item on POST', function () {
        chai.request(app)
            .post('/items/create')
            .send({
                itemName: "autotest-item",
                placeName: "autotest-place",
                placeId: "place123-autotest",
                areaName: "autotest-area",
                areaId: "area123-autotest",
                categoryName: "autotest-category",
                categoryId: "category123-autotest",
                loggedInUserName: "user-autotest",
                loggedInUserId: "user@autotest.com"
            })
            .then(function (err, res) {
                //should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });


    it('Should Update an item', function () {
        chai.request(app)
            .put('/items/:id')
            .send({
                itemName: "autotest-item",
                placeName: "autotest-place",
                placeId: "place123-autotest",
                areaName: "autotest-area",
                areaId: "area123-autotest",
                categoryName: "autotest-category",
                categoryId: "category123-autotest",
                loggedInUserName: "user-autotest",
                loggedInUserId: "user@autotest.com"
            })
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });

    it('should add a place on POST', function () {
        chai.request(app)
            .post('/places/create')
            .send({
                placeName: "autotest-place",
                areaName: "autotest-area",
                areaId: "area123-autotest",
                loggedInUserName: "user-autotest",
                loggedInUserId: "user@autotest.com"
            })
            .then(function (err, res) {
                //should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });

    it('should add an area on POST', function () {
        chai.request(app)
            .post('/areas/create')
            .send({
                areaName: "autotest-area",
                loggedInUserName: "user-autotest",
                loggedInUserId: "user@autotest.com"
            })
            .then(function (err, res) {
                //should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });

    it('should add a category on POST', function () {
        chai.request(app)
            .post('/categories/create')
            .send({
                categoryName: "autotest-category",
                loggedInUserName: "user-autotest",
                loggedInUserId: "user@autotest.com"
            })
            .then(function (err, res) {
                //should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });*/
/* it('Should Update an entry', function () {
     chai.request(app)
         .put('/entry/:id') //<-------????? Put request to '/entry/:id'
         .then(function (res) {
             res.should.have.status(201);
             done();
         })
         .catch(err => console.log({
             err
         }));
 });
 it('Should Delete an entry', function () {

     chai.request(app)
         .delete('/entry/:id')
         .then(function (res) {
             res.should.have.status(201);
             done();
         })
         .catch(err => console.log({
             err
         }));

 });
 it('Should Get All Users entries', function () {

     chai.request(app)
         .get('/entry-date/:user') //<-------????? Get request to '/entry-date/:user'
         .then(function (res) {
             res.should.have.status(201);
             done();
         })
         .catch(err => console.log({
             err
         }));
 });*/

/*    it('Should Get All Item entries', function () {

        chai.request(app)
            .get('/entry-date/:user') //<-------????? Get request to '/entry-date/:user'
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });

});*/
