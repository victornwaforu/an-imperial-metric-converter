const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    suite("function convertHandler.getNum(input)", function() {

        test("whole number input", function(done) {
            let input = "31L";
            assert.equal(convertHandler.getNum(input), 31);
            done();
        });

        test("decimal number input", function(done) {
            let input = "31.7L";
            assert.equal(convertHandler.getNum(input), 31.7);
            done();
        });

        test("fractional input", function(done) {
            let input = "7/31L";
            assert.equal(convertHandler.getNum(input), 7/31);
            done();
        });

        test("fractional input with a decimal", function(done) {
            let input = "2.7/31L";
            assert.equal(convertHandler.getNum(input), 2.7/31);
            done();
        });

        test("double-fraction input", function(done) {
            let input = "1/7/31L";
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test("no numerical input", function(done) {
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite("function convertHandler.getUnit(input)", function() {

        test("each valid input unit", function(done) {
            let input = ["gal", "mi", "l", "km", "lbs", "kg", "KG", "LBS", "KM", "L", "MI", "GAL"];
            let output = ["gal", "mi", "L", "km", "lbs", "kg", "kg", "lbs", "km", "L", "mi", "gal"];

            input.forEach(function(element, index) {
                assert.equal(convertHandler.getUnit(element), output[index]);
            });
            done();
        });

        test("an invalid input unit", function(done) {
           assert.equal(convertHandler.getUnit("31kilograms"), undefined);
            done();
        });
    });

    suite("function convertHandler.getReturnUnit(initUnit)", function() {

        test("for each valid input unit", function(done) {
            let input = ["gal", "mi", "l", "km", "lbs", "kg"];
            let output = ["L", "km", "gal", "mi", "kg", "lbs"];

            input.forEach(function(element, index) {
                assert.equal(convertHandler.getReturnUnit(element), output[index]);
            });
            done();
        });
    });

    suite("function convertHandler.spellOutUnit(unit)", function() {

        test("for each valid input unit", function(done) {
            let input = ["gal", "mi", "l", "km", "lbs", "kg"];
            let expect = ["gallons", "miles", "liters", "kilometers", "pounds", "kilograms"];

            input.forEach(function(element, index) {
                assert.equal(convertHandler.spellOutUnit(element), expect[index]);
            });
            done();
        });
    });

    suite("function convertHandler.convert(num, unit)", function() {

        test("Gal to L", function(done) {
            let input = [5, "gal"];
            let expected = [18.92705];
            assert.equal(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("Mi to Km", function(done) {
            let input = [5, "mi"];
            let expected = [8.0467];
            assert.equal(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("Km to Mi", function(done) {
            let input = [5, "km"];
            let expected = [3.10686];
            assert.equal(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("Lbs to Kg", function(done) {
            let input = [5, "lbs"];
            let expected = [2.26796];
            assert.equal(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("Kg to Lbs", function(done) {
            let input = [5, "kg"];
            let expected = [11.02312];
            assert.equal(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test("L to Gal", function(done) {
            let input = [5, "l"];
            let expected = [1.32086];
            assert.equal(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
    });



});