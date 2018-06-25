// GET RATES  API Call or scrape
// const axios = require("axios");
// const APP_ID = "13ce2e3a7f164d859509b24b641e3a24";
// function convertCurrencies(value, from, to) {
//     // return function (dispatch) {
   
//         https: //openexchangerates.org/api/convert/19999.95/GBP/EUR?app_id=YOUR_APP_ID

//         axios.get(`https: //openexchangerates.org/api/convert/${value}/${from}/${to}?app_id=${APP_ID}`)
//         .then((response) => {
//             console.log(response)
//             // createShipment()
//             // dispatch({
//             //     type:  Shippo.VERIFY_ADDRESS,
//             //     payload:  response.data
//             // });
//         })
//         .catch((err) => {
//             // Error Handling
//             console.log(err)
//         })
//     // }
// }

// convertCurrencies(20, "USD", "GBP")


export var fx = require("money");

fx.base = "EUR";
fx.rates = {
	"EUR" : 1, //base rate
	"USD" : 1.1578,
    "JPY" : 127.39,
    "BGN" : 1.9558,
    "CZK" : 25.835,
    "DKK" : 7.4525,
    "GBP" : 0.87878,
    "HUF" : 324.15,
    "PLN" : 4.3152,
    "RON" : 4.6695,
    "SEK" : 10.2755,
    "CHF" : 1.1537,
    "ISK" : 125.80,
    "NOK" : 9.4693,
    "HRK" : 7.3836,
    "RUB" : 73.6225,
    "TRY" : 5.4943,
    "AUD" : 1.5688,
    "BRL" : 4.3273,
    "CAD" : 1.5398,
    "CNY" : 7.4953,
    "HKD" : 9.0847,
    "IDR" : 16320.23,
    "ILS" : 4.2085,
    "INR" : 78.8600,
    "KRW" : 1281.98,
    "MXN" : 23.6794,
    "MYR" : 4.6318,
    "NZD" : 1.6853,
    "PHP" : 61.864,
    "SGD" : 1.5718,
    "THB" : 37.987,
    "ZAR" : 15.8367
}


var num = fx.convert(1, {from: "CHF", to: "USD"});
console.log(num)
