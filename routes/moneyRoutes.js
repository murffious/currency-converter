var fx = require("money");
var axios = require("axios")
var url = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
var xmlparser = require('express-xml-bodyparser');

var request = require('request');


var DOMParser = require('xmldom').DOMParser;
var doc = new DOMParser().parseFromString(
    '<xml xmlns="a" xmlns:c="./lite">\n'+
        '\t<child>test</child>\n'+
        '\t<child></child>\n'+
        '\t<child/>\n'+
    '</xml>'
    ,'text/xml');
doc.documentElement.setAttribute('x','y');
doc.documentElement.setAttributeNS('./lite','c:x','y2');
var nsAttr = doc.documentElement.getAttributeNS('./lite','x')
console.info(nsAttr)
console.info(doc)


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




module.exports = app => {

    app.get('/convert', (req, res) => {
        var num = fx.convert(1, {from: "CHF", to: "USD"});
        console.log(res)
        res.json({rates:{base:num}});
    });

    app.get('/exchange-rates', xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
        // check req.body 
        axios.defaults.headers.post['Content-Type'] = 'text/xml';

        axios.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml").then(async res=>{
console.log("hello", res.data) 
      });
           res.send(res.body)
           
    })


    app.get('/refresh-exchange-rates', (req, res) => {

        var sendJsonResponse = function(res, status, content) {
            res.status(status);
            res.json(content);
      };
      
       request.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', function (err,response, body) {
            
        var doc = new DOMParser().parseFromString(
            body
            ,'text/xml');   
        //    console.log(doc.getElementsByTagName("Cube")[0].childNodes[0].nodeValue)
          console.log(doc.getElementsByTagName("Cube")[10].attributes[0].value, Number(doc.getElementsByTagName("Cube")[10].attributes[1].value))
// console.log(doc.getElementsByTagName("Cube"))
            var ratesObj = {};
            var str = doc.getElementsByTagName("Cube");
            for (let i = 2; i < 38; i++) {
                if (doc.getElementsByTagName("Cube")[i]){
                ratesObj[(doc.getElementsByTagName("Cube")[i].attributes[0].value)] = Number(doc.getElementsByTagName("Cube")[i].attributes[1].value)
            }
        }
        //     var x = doc.getElementsByTagName("Cube")[10]
        //     var currency = x.getAttributeNode("currency");
        //     var txt = currency.nodeValue;
        //     var y = x.getAttributeNode("rate");
        //     var rate = y.nodeValue;
        // console.log(txt, rate)
        



            // doc.getElementsByTagName("Cube")[10].forEach(rate =>{
            //     ratesObj[rate.attributes[0].value] =  Number(rate.attributes[1].value)
            // })
            res.json(ratesObj)
        //   console.log(ratesObj)
            
            var input = ['display: none ', 'opacity: 0.1', ' color: #ff0000'];
            
            var css = input.reduce((p, c) => {
              var x = c.split(':');
              p[x[0].trim()] = x[1].trim();
              return p;
            }, {});

    //    sendJsonResponse(res, 200, ratesObj);
      });


     

    });

}
