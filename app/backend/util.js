function dateString2Object(dateString) {
    return new Date(dateString);
}

function dateString2SQL(dateString) {
    let dateObject = new Date(dateString);
    return dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + dateObject.getDate();
}

module.exports.dateString2Object = dateString2Object;
module.exports.dateString2SQL = dateString2SQL;