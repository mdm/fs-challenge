let mocha = require('mocha');
let chai = require('chai');
let rewire = require('rewire');

let should = chai.should();

process.env.NODE_ENV = 'test';

let validators = rewire('../validators');


describe('Validators', () => {
    describe('hasMissingProperties', () => {
        it('should accept an item without missing properties', () => {
            let hasMissingProperties = validators.__get__('hasMissingProperties');

            let newItem = {
                city: 'Köln',
                start_date: '10/5/2017',
                end_date: '10/13/2017',
                price: '100.00',
                status: 'Once',
                color: '#ff0000'
            };

            let missingProperties = hasMissingProperties(newItem);
            missingProperties.should.be.a('array');
            missingProperties.should.have.lengthOf(0);
        });

        it('should report a missing end_date', () => {
            let hasMissingProperties = validators.__get__('hasMissingProperties');

            let newItem = {
                city: 'Köln',
                start_date: '10/5/2017',
                price: '100.00',
                status: 'Once',
                color: '#ff0000'
            };

            let missingProperties = hasMissingProperties(newItem);
            missingProperties.should.be.a('array');
            missingProperties.should.have.lengthOf(1);
        });
    });

    describe('isString', () => {
        it('should accept a valid string', () => {
            let isString = validators.__get__('isString');

            isString('a string').should.be.true;
        });

        it('should reject an invalid string', () => {
            let isString = validators.__get__('isString');

            isString(123).should.be.false;
        });
    });

    describe('isDate', () => {
        it('should accept a valid date string', () => {
            let isDate = validators.__get__('isDate');

            isDate('10/30/2017').should.be.true;
        });

        it('should reject an invalid date string', () => {
            let isDate = validators.__get__('isDate');

            isDate('30/10/2017').should.be.false;
        });
    });


    describe('isPrice', () => {
        it('should accept a valid price string', () => {
            let isPrice = validators.__get__('isPrice');

            isPrice('9.99').should.be.true;
        });

        it('should reject an invalid price string', () => {
            let isPrice = validators.__get__('isPrice');

            isPrice('100.001').should.be.false;
        });
    });


    describe('isColor', () => {
        it('should accept a valid HTML color value', () => {
            let isColor = validators.__get__('isColor');

            isColor('#ff0000').should.be.true;
        });

        it('should reject an invalid HTML color value', () => {
            let isColor = validators.__get__('isColor');

            isColor('red').should.be.false;
        });
    });
});
