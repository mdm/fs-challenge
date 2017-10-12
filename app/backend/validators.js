function hasMissingProperties(item) {
    let expectedProperties = ['city', 'start_date', 'end_date', 'price', 'status', 'color'];
    let errors = [];
    for(let i = 0; i < expectedProperties.length; i++) {
        if(item[expectedProperties[i]] === undefined) {
            errors.push(expectedProperties[i] + ' is missing.');
        }
    }

    return errors;
}

function isString(candidate) {
    return typeof candidate === 'string';
}

function isDate(candidate) {
    let match = candidate.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if(match) {
        if(parseInt(match[1]) < 1 || parseInt(match[1]) > 12) {
            return false;
        }

        if(parseInt(match[2]) < 1 || parseInt(match[1]) > 31) {
            return false;
        }

        if(parseInt(match[3]) < 0) {
            return false;
        }

        return true;
    } else {
        return false;
    }
}

function isPrice(candidate) {
    if(isString(candidate) && candidate.match(/(^\d+$)|(^\d+\.\d{1,2}$)/)) {
        return true;
    } else {
        return false;
    }
}

function isColor(candidate) {
    if(isString(candidate)) {
        candidate = candidate.toLowerCase();
        if(candidate.match(/#[a-f0-9]{6}/)) {
            return true;
        }
    }

    return false;
}

function hasErrors(item) {
    let errors = hasMissingProperties(item);
    if(item.city !== undefined && !isString(item.city)) {
        errors.push('city must be a string.');
    }
    if(item.start_date !== undefined && !isDate(item.start_date)) {
        errors.push('start_date must be a valid date.');
    }
    if(item.end_date !== undefined && !isDate(item.end_date)) {
        errors.push('end_date must be a valid date.');
    }
    if(item.price !== undefined && !isPrice(item.price)) {
        errors.push('price must be a valid currency value.');
    }
    if(item.status !== undefined && !isString(item.status)) {
        errors.push('status must be a string.');
    }
    if(item.color !== undefined && !isColor(item.color)) {
        errors.push('color must be a valid HTML color value.');
    }

    if(errors.length > 0) {
        return errors;
    } else {
        return false;
    }    
}

module.exports.hasErrors = hasErrors;