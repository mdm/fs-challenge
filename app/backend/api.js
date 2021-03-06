let express = require('express');
let bodyParser = require('body-parser');

let db = require('./db');
let util = require('./util');
let validators = require('./validators');

let router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    let errors = validators.hasErrors(req.body);
    if(errors) {
        res.status(400)
        .send({ errors: errors });
        return;
    }
    req.body.start_date = util.dateString2sql(req.body.start_date);
    req.body.end_date = util.dateString2sql(req.body.end_date);
    req.body.price = util.priceString2integer(req.body.price);
    db.query('INSERT INTO items (city, start_date, end_date, price, status, color) VALUES (:city, :start_date, :end_date, :price, :status, :color)',
        req.body,
        (err) => {
        if(err) {
            res.status(500)
            .send({ errors: ['Database error: ' + err.message] });
        } else {
            res.setHeader('location', '/api/items/' + db.lastInsertId());
            res.status(200).send({ success: true });
        }
    });
    db.end();
});

router.get('/', (req, res) => {
    db.query('SELECT id, city, start_date, end_date, price, status, color FROM items', (err, results) => {
        if(err) {
            res.status(500)
            .send({ errors: ['Database error: ' + err.message] });
        } else {
            results = results.map((result) => {
                result.start_date = util.sql2dateString(result.start_date);
                result.end_date = util.sql2dateString(result.end_date);
                result.price = util.integer2price(result.price);
                return result;
            });
            res.status(200)
            .send(results);
        }
    });
    db.end();
});

router.get('/:id', (req, res) => {
    db.query('SELECT id, city, start_date, end_date, price, status, color FROM items WHERE id = :id', { id: req.params.id }, (err, results) => {
        if(err) {
            res.status(500)
            .send({ errors: ['Database error: ' + err.message] });
        } else {
            if(results.length === 0) {
                res.status(404)
                .send({ errors: ['Item not found.'] });
            } else {
                let result = results[0];
                result.start_date = util.sql2dateString(result.start_date);
                result.end_date = util.sql2dateString(result.end_date);
                result.price = util.integer2price(result.price);
                res.status(200)
                .send(result);
            }
        }
    });
    db.end();
});

router.put('/:id', (req, res) => {
    let errors = validators.hasErrors(req.body);
    if(errors) {
        res.status(400)
        .send({ errors: errors });
        return;
    }
    req.body.start_date = util.dateString2sql(req.body.start_date);
    req.body.end_date = util.dateString2sql(req.body.end_date);
    req.body.price = util.priceString2integer(req.body.price);
    req.body.id = req.params.id;
    db.query('UPDATE items SET city = :city, start_date = :start_date, end_date = :end_date, price = :price, status = :status, color = :color WHERE id = :id', req.body, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500)
            .send({ errors: ['Database error: ' + err.message] });
        } else {
            if(results.info.affectedRows === '0') {
                res.status(404)
                .send({ errors: ['Item not found.'] });
            } else {
                res.status(200).send({ success: true });
            }
        }
    });
    db.end();
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM items WHERE id = :id', { id: req.params.id }, (err, results) => {
        if(err) {
            res.status(500)
            .send({ errors: ['Database error: ' + err.message] });
        } else {
            if(results.info.affectedRows === '0') {
                res.status(404)
                .send({ errors: ['Item not found.'] });
            } else {
                res.status(200).send({ success: true });
            }
        }
    });
    db.end();
});

module.exports = router;
