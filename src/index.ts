//#  sudo apt-get install -y libgbm-dev
//# sudo apt-get install libatk-bridge2.0-0
//# sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
//# https://wwebjs.dev

import express from "express";
import 'dotenv/config'
import morgan from "morgan";
import {ExpressService} from "./package/service/ExpressService";
import {ApiService} from "./package/service/ApiService";
import axios from "axios";


ExpressService.headers = {
    "Access-Control-Allow-Origin" : "*"
}


ExpressService.getInstance().appExpress.get('/',(req,res)=>{

    axios.get('http://www.flickr.com/services/feeds/photos_public.gne?format=json').then(function(response){
            var jsonFlickrFeed = (response)=>{
                return (response)
            }

           var data =  eval(response.data);
        res.send(data);
    }).catch(err=>{
        console.log('res',err)
        res.send(err);
    })
});

