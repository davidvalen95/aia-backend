import {Singleton} from "../class/Singleton";


export class EnvService extends Singleton<EnvService>(){


    private env:any;

    protected constructor() {
        super();

        this.env = require('dotenv').config().parsed;;


    }

    public get(envVariable:string):string|string[]{

        if(!this.env){
            return null;
        }
        var result = this.env[envVariable];

        //# pipe become array
        result = result?.indexOf('|') >=0 ? result.split('|') : result;
        return result;
    }





}