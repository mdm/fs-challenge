const express = require('express');
let app = express();
 
app.use(express.static('../frontend'));
 
app.listen(3000);
