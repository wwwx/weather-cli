#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var colors_1 = __importDefault(require("colors"));
var commander_1 = require("commander");
var chineseWeek_1 = __importDefault(require("./chineseWeek"));
commander_1.program.option("-c, --city [name]", "Add city name");
commander_1.program.option("-a, --all", "Show forecast weather");
commander_1.program.parse();
var options = commander_1.program.opts();
if (process.argv.slice(2).length === 0) {
    commander_1.program.outputHelp(colors_1.default.red);
    process.exit();
}
var WEATHER_INFO_API = "https://restapi.amap.com/v3/weather/weatherInfo";
var APP_WEATHER_KEY = "67eff89f49eee2dc498cccfd756b8ed7";
var STATUS_CODE_SUCCESS = "1";
axios_1.default
    .get("".concat(WEATHER_INFO_API, "?key=").concat(APP_WEATHER_KEY, "&city=").concat(options.city, "&extensions=").concat(options.all ? "all" : "base"))
    .then(function (response) {
    if (response.status === 200) {
        // console.log(JSON.stringify(response.data));
        if (response.data.status === STATUS_CODE_SUCCESS) {
            console.log(colors_1.default.green(response.data.info));
            var data = [];
            if (options.all) {
                data = response.data.forecasts[0].casts;
            }
            else {
                data = response.data.lives;
            }
            data.forEach(function (item) {
                item.week = (0, chineseWeek_1.default)(~~item.week);
                item.daytemp = item.daytemp + "°C";
                item.nighttemp = item.nighttemp + "°C";
            });
            console.table(data);
        }
        else {
            console.log(colors_1.default.red(JSON.stringify(response.data)));
        }
    }
    else {
        console.log(colors_1.default.red(response.statusText));
    }
});
