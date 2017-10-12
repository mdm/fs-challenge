let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let sinon = require('sinon');
let rewire = require('rewire');

let should = chai.should();
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

// make app and db connection visible without exporting it
let index = rewire('../index');
let app = index.__get__('app'); 

let db = require('../db');

describe('/api', () => {
    beforeEach((done) => {
        db.query('TRUNCATE items', () => {
            db.query("INSERT INTO items (id, city, start_date, end_date, price, status, color) VALUES \
                      (1, 'Köln', '2017-01-01', '2017-01-31', 10000, 'Daily', '#ff0000'), \
                      (2, 'Bonn', '2016-01-01', '2016-12-31', 9999, 'Yearly', '#00ff00'), \
                      (3, 'Düsseldorf', '2018-01-01', '2018-11-11', 1234, 'Daily', '#0000ff')", (err) => {
                done();
            });
        });
        db.end();
    });

    describe('POST /items', () => {
        it('should create a new item and redirect', (done) => {
            let newItem = {
                city: 'Köln',
                start_date: '10/5/2017',
                end_date: '10/13/2017',
                price: '100.00',
                status: 'Once',
                color: '#ff0000'
            };

            chai.request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.header('location', /\/api\/items\/\d+/);
                done();
            });
        });

        it('should reject an invalid new item', (done) => {
            let newItem = {
                city: 123, // invalid
                start_date: '10/5/2017',
                end_date: '10/13/2017',
                //price: '100.00', // missing
                status: 'Once',
                color: '#ff0000'
            };

            chai.request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                res.body.errors.should.have.lengthOf(2);
                done();
            });
        });
    });

    describe('GET /items', () => {
        it('should return a list of items', (done) => {
            chai.request(app)
            .get('/api/items')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(3);
                done();
            });
        });
    });

    describe('GET /items/:id', () => {
        it('should return a single item', (done) => {
            chai.request(app)
            .get('/api/items/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.all.keys('id', 'city', 'start_date', 'end_date', 'price', 'status', 'color');
                done();
            });
        });

        it('should return an error because we try to read a non-existing item', (done) => {
            chai.request(app)
            .get('/api/items/10')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                res.body.errors.should.have.lengthOf(1);
                done();
            });
        });
    });

    describe('PUT /items/:id', () => {
        it('should update a single item', (done) => {
            let newItem = {
                city: 'Köln',
                start_date: '10/5/2017',
                end_date: '10/13/2017',
                price: '100.00',
                status: 'Once',
                color: '#ff0000'
            };
        
            chai.request(app)
            .put('/api/items/1')
            .send(newItem)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('should return an error because we try to update a non-existing item', (done) => {
            let newItem = {
                city: 'Köln',
                start_date: '10/5/2017',
                end_date: '10/13/2017',
                price: '100.00',
                status: 'Once',
                color: '#ff0000'
            };

            chai.request(app)
            .put('/api/items/10')
            .send(newItem)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                res.body.errors.should.have.lengthOf(1);
                done();
            });
        });
    });

    describe('DELETE /items/:id', () => {
        it('should delete a single item', (done) => {
            chai.request(app)
            .delete('/api/items/1')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('should return an error because we try to delete a non-existing item', (done) => {
            chai.request(app)
            .delete('/api/items/10')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                res.body.errors.should.have.lengthOf(1);
                done();
            });
        });
    });
});