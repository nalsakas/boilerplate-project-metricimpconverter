const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number input.", () => {
        assert.equal(convertHandler.getNum("15mi"), 15)
    })
    test("convertHandler should correctly read a decimal number input.", ()=>{
        assert.equal(convertHandler.getNum("15.0km"), 15.0)
    })
    test("convertHandler should correctly read a fractional input.", ()=>{
        assert.equal(convertHandler.getNum("15/3km"), 5)    
    })
    test("convertHandler should correctly read a fractional input with a decimal.", ()=>{
        assert.equal(convertHandler.getNum("15.0/3.0km"), 5)    
    })
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", ()=>{
        assert.throws(()=>convertHandler.getNum("15.0//3.0km"), Error)    
    })
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", ()=>{
        assert.equal(convertHandler.getNum("km"), 1)    
    })



    test("convertHandler should correctly read each valid input unit.", ()=>{
        assert.equal(convertHandler.getUnit("km"), "km")
        assert.equal(convertHandler.getUnit("mi"), "mi")
        assert.equal(convertHandler.getUnit("l"), "L")
        assert.equal(convertHandler.getUnit("gal"), "gal")
        assert.equal(convertHandler.getUnit("lbs"), "lbs")
        assert.equal(convertHandler.getUnit("kg"), "kg")
    })
    test("convertHandler should correctly return an error for an invalid input unit.", ()=>{
        assert.throws(()=>convertHandler.getUnit("15.0lll"), Error)
    })
    test("convertHandler should return the correct return unit for each valid input unit.", ()=>{
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs")
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg")
        assert.equal(convertHandler.getReturnUnit("km"), "mi")
        assert.equal(convertHandler.getReturnUnit("mi"), "km")
        assert.equal(convertHandler.getReturnUnit("L"), "gal")
        assert.equal(convertHandler.getReturnUnit("gal"), "L")
    })
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", ()=>{
        assert.equal(convertHandler.spellOutUnit("mi"), "miles")
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers")
        assert.equal(convertHandler.spellOutUnit("L"), "liters")
        assert.equal(convertHandler.spellOutUnit("gal"), "galons")
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds")
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms")
    })
    test("convertHandler should correctly convert gal to L", () => {
        assert.equal(convertHandler.convert(1, "gal"), 3.78541) 
    })
    test("convertHandler should correctly convert L to gal", () => {
        assert.equal(convertHandler.convert(1, "L"), 0.26417) 
    })
    test("convertHandler should correctly convert mi to km", () => {
        assert.equal(convertHandler.convert(1, "mi"), 1.60934) 
    })
    test("convertHandler should correctly convert km to mi", () => {
        assert.equal(convertHandler.convert(1, "km"), 0.62137)  
    })
    test("convertHandler should correctly convert lbs to kg", () => {
        assert.equal(convertHandler.convert(1, "lbs"), 0.45359)
    })
    test("convertHandler should correctly convert kg to lbs", () => {
        assert.equal(convertHandler.convert(1, "kg"), 2.20462)  
    })
});