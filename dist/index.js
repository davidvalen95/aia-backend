"use strict";
//#  sudo apt-get install -y libgbm-dev
//# sudo apt-get install libatk-bridge2.0-0
//# sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
//# https://wwebjs.dev
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var ExpressService_1 = require("./package/service/ExpressService");
var axios_1 = __importDefault(require("axios"));
ExpressService_1.ExpressService.headers = {
    "Access-Control-Allow-Origin": "*"
};
ExpressService_1.ExpressService.getInstance().appExpress.get('/', function (req, res) {
    var _a;
    axios_1.default.get('http://www.flickr.com/services/feeds/photos_public.gne', {
        params: {
            format: "json",
            tags: (_a = req.query.tag) !== null && _a !== void 0 ? _a : '',
        }
    }).then(function (response) {
        var _a;
        var jsonFlickrFeed = function (response) {
            return (response);
        };
        var data = eval(response.data);
        var chunk = 6;
        var page = +((_a = req.query.page) !== null && _a !== void 0 ? _a : 1);
        data.items = data.items.slice((page - 1) * chunk, page * chunk - 1);
        res.send(data);
    }).catch(function (err) {
        console.log('res', err);
        res.send(err);
    });
});
