const five = require("johnny-five");
const board = new five.Board();
const http = require('http');
const weather = require('openweather-apis');
weather.setLang('en');
weather.setCityId(693457);
weather.setAPPID('2164ddc779ae96e8f10e98d3c9982f2a');

board.on("ready", function () {
    const lcd = new five.LCD({
        controller: "PCF8574"
    });


    weather.getAllWeather()
        .then((JSONObj) => {
            lcd.print("Smila," + JSONObj.weather[0].main + "T:" + JSONObj.main.temp);
            lcd.cursor(1, 0).print("Wind:"+ JSONObj.wind.speed + "P:"+JSONObj.main.pressure + "H:"+ JSONObj.main.humidity);
        })
                // lcd.print("Smila," + JSONObj.weather[0].main + "T:" + JSONObj.main.temp);
                // lcd.cursor(1, 0).print("Wind:"+ JSONObj.wind.speed + "P:"+JSONObj.main.pressure + "H:"+ JSONObj.main.humidity);


    console.log(smila());

    http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
    }).listen(3000);
});