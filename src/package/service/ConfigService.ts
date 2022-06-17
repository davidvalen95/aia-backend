import {Singleton} from "../class/Singleton";


export class ConfigService extends Singleton<ConfigService>(){




    get(path){
        //# path app.port
        var config = require('config');
        return  config.get(path);
    }



}