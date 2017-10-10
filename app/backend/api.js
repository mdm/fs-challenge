let express = require('express');
let bodyParser = require('body-parser');

let db = require('./db');
let util = require('./util');

let router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    req.body.start_date = util.dateString2SQL(req.body.start_date);
    req.body.end_date = util.dateString2SQL(req.body.end_date);
    db.query('INSERT INTO items (city, start_date, end_date, price, status, color) VALUES (:city, :start_date, :end_date, :price, :status, :color)',
        req.body,
        (err) => {
        if(err) {
            res.sendStatus(500);
            res.send(JSON.stringify({
                errors: ['Database error: ' + err.message]
            }));
        } else {
            res.setHeader('location', '/api/items/' + db.lastInsertId());
            res.sendStatus(200);
        }
    });
});

router.get('/', (req, res) => {
    db.query('SELECT city, start_date, end_date, price, status, color FROM items', (err, results) => {
        if(err) {
            res.sendStatus(500);
            res.send(JSON.stringify({
                errors: ['Database error: ' + err.message]
            }));
        } else {
            res.sendStatus(200);
            res.send(JSON.stringify(results));
        }
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT city, start_date, end_date, price, status, color FROM items WHERE id = :id', { id: req.params.id }, (err, results) => {
        if(err) {
            res.sendStatus(500);
            res.send(JSON.stringify({
                errors: ['Database error: ' + err.message]
            }));
        } else {
            if(results.length === 0) {
                res.sendStatus(404);
                res.send(JSON.stringify({
                    errors: ['Item not found.']
                }));
            } else {
                res.sendStatus(200);
                res.send(JSON.stringify(results[0]));
            }
        }
    });
});

router.put('/:id', (req, res) => {
    req.body.id = req.params.id;
    db.query('UPDATE items SET city = :city, start_date = :start_date, end_date = :end_date, price = :price, status = :status, color = :color WHERE id = :id', req.body, (err, results) => {
        if(err) {
            res.sendStatus(500);
            res.send(JSON.stringify({
                errors: ['Database error: ' + err.message]
            }));
        } else {
            if(results.length === 0) {
                res.sendStatus(404);
                res.send(JSON.stringify({
                    errors: ['Item not found.']
                }));
            } else {
                res.sendStatus(200);
                res.send(JSON.stringify(results[0]));
            }
        }
    });
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM items WHERE id = :id', { id: req.params.id }, (err, results) => {
        if(err) {
            res.sendStatus(500);
            res.send(JSON.stringify({
                errors: ['Database error: ' + err.message]
            }));
        } else {
            if(results.length === 0) {
                res.sendStatus(404);
                res.send(JSON.stringify({
                    errors: ['Item not found.']
                }));
            } else {
                res.sendStatus(200);
                res.send(JSON.stringify(results[0]));
            }
        }
    });
});

module.exports = router;
