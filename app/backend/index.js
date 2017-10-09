let express = require('express');
let api = require('./api');

let app = express();
 
app.use('/api/items', api);
app.use(express.static('../frontend'));
 
app.listen(3000);
