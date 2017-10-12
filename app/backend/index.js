let express = require('express');
let api = require('./api');

let app = express();
 
app.use('/api/items', api);
app.use(express.static('../frontend/public'));
 
app.listen(3000);
