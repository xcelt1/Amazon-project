import { formateCurrency } from "../script/Utiity/money.js";
//describe() is a jasmine function, that takes two parameters ....
//it takes in first a string
//1. formate currency
//2.second parameter is a call back
describe('Test suite formateCurrency', () => {
//Jasmine provide us with another function'it()'
//NB: the jasmine inbuilt functions, expect() and toEqual
    it("converts cents to dollars", () =>{
        expect(formateCurrency(2095)).toEqual("20.95")
    })
    it("converting 0 to dollar", () => {
        expect(formateCurrency(0)).toEqual("0.00")
    })
    it("rounding priceCents to Dollar", () => {
        expect(formateCurrency(2000.5)).toEqual("20.01")
    })
})


