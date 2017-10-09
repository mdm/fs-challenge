let express = require('express');

let router = express.Router();

router.get('/', function (req, res) {
  res.sendStatus(403);
});

module.exports = router;
