const {
    app,
    runServer,
    closeServer
} = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

var items = require('../models/items.js');
const {
    TEST_DATABASE_URL
} = require('../config');

var should = chai.should();

chai.use(chaiHttp);

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function seedItemsData() {
    console.info('seeding Items data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push({
            itemName: faker.company.companyName(),
            placeName: faker.address.city(),
            placeId: faker.hacker.adjective(),
            areaName: faker.address.country(),
            areaId: faker.hacker.adjective(),
            categoryName: faker.lorem.word(),
            categoryId: faker.hacker.noun(),
            loggedInUserName: "test-user",
            loggedInUserId: "1234"
        });
    }
    return items.insertMany(seedData);
}

//Generate random data using faker
function generateItemsData() {
    return {
        itemName: faker.company.companyName(),
        placeName: faker.address.city(),
        placeId: faker.hacker.adjective(),
        areaName: faker.address.country(),
        areaId: faker.hacker.adjective(),
        categoryName: faker.lorem.word(),
        categoryId: faker.hacker.noun(),
        loggedInUserName: "test-user",
        loggedInUserId: "1234"
    };
}

describe('where-is-it-node-capstone', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedItemsData();
    });

    afterEach(function () {
        return tearDownDb();
    });*

    after(function () {
        return closeServer();
    });
    it('should add an item on POST', function () {
        const itemElement = generateItemsData();

        chai.request(app)
            .post('/items/create')
            .send(itemElement)
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

});
