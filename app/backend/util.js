function dateString2sql(dateString) {
    let dateObject = new Date(dateString);
    return dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + dateObject.getDate();
}

function sql2dateString(sql) {
    let parts = sql.split('-');
    return parts[1] + '/' + parts[2] + '/' + parts[0];
}

function priceString2integer(priceString) {
    return Math.round(parseFloat(priceString) * 100);
}

function integer2price(integer) {
    return integer / 100;
}

module.exports.dateString2sql = dateString2sql;
module.exports.sql2dateString = sql2dateString;
module.exports.priceString2integer = priceString2integer;
module.exports.integer2price = integer2price;