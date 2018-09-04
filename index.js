const five = require("johnny-five");
const board = new five.Board();
const weather = require('openweather-apis');
weather.setLang('en');
weather.setAPPID('2164ddc779ae96e8f10e98d3c9982f2a');

board.on("ready", async function () {
    const lcd = new five.LCD({
        controller: "PCF8574"
    });
    let data, Smila, Cherkassy;
    let flag = 0;

    setInterval(async function() {
        Smila = await getWeather(693457);
        Cherkassy = await getWeather(710791);
        data = [Smila, Cherkassy];
        lcd.clear();
        lcd.cursor(0, 0).print(data[flag][0]);
        lcd.cursor(1, 0).print(data[flag][1]);
        flag = (flag) ? 0 : 1;
    }, 5000);
});

function getWeather(id) {
    return new Promise((resolve, reject) => {
        weather.setCityId(id);
        weather.getAllWeather((err, JSONObj) => {
            if (err) return reject('API error');
            resolve([ JSONObj.name + " " + JSONObj.weather[0].main, "Temp:" + parseInt(JSONObj.main.temp) + " Wind:" + parseInt(JSONObj.wind.speed)]);
        });
    });
}