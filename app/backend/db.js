let DBClient = require('mariasql');
let fs = require('fs');

let db;
if(process.env.NODE_ENV === 'test') {
    db = new DBClient({
        host: 'localhost',
        user: 'test',
        password: 'password',
        db: 'test'
    });
} else {
    let secret = fs.readFileSync('/run/secrets/db_user_password', { encoding: 'utf8' }).trim();
    db = new DBClient({
        host: 'database',
        user: 'challenge',
        password: secret,
        db: 'challenge'
    });
}

module.exports = db;