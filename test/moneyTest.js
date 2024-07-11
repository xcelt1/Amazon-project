import { formateCurrency } from "../script/Utiity/money.js";
console.log('Money suits: formate currency')
console.log("converts cents to dollars")
if (formateCurrency(2095) === '20.95'){
    console.log('Passed');
}else{
    console.log('failed')
};
console.log('converting to 0 to dollars')
if(formateCurrency(0) === '0.00'){
    console.log('Passed')
}else{
    console.log('Failed')
};
console.log('rounding priceCents first and converting to dollar')
if(formateCurrency(2000.5) === '20.01'){
    console.log('Passed')
}else{
    console.log('Failed')
};