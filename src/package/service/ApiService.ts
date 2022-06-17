import {KeyValueInterface} from "./Interface/KeyValueInterface";
import {Singleton} from "../class/Singleton";
import {isString} from "util";
import axios from "axios";

export class ApiService extends Singleton<ApiService>() {


    // // // # LIVE URL  /   TEST URL

    public static queryParamsAddOn: any        = {};
    public static headers: KeyValueInterface[] = [];
    public static baseUrl: string              = "";
    public static apiUrl: string               = "";


    public isInternet: boolean = null;

    public globalHeader: KeyValueInterface[] = [];


    private getToken(params: object | string, salt: string = 'garamDapur') {


        if (typeof params == 'string') {
            params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        }
        //# sort
        params = Object.keys(params).sort().reduce((carry, currentKey) => {

            carry[currentKey] = params[currentKey];
            return carry;
        }, {});

        var ignore = [
            'eToken',
            'paramString'
        ];

        var paramString = Object.keys(params).reduce((carry, currentKey) => {
            var current = params[currentKey];

            // console.log('getToken', currentKey ,current,)


            if (ignore.indexOf(currentKey) > -1) {
                // console.log('getTokenIgnored', currentKey ,current,)

                return carry;
            }
            if (current == null || current == 'null' || current == 'NULL') {
                // console.log('getTokenUndefined', currentKey ,current, carry + "")
                return carry;
            }

            if (!(typeof current === "number") && !(typeof current === 'string') && !(typeof current === "boolean")) {
                return carry;
            }


            return carry + (current);
        }, '');


        // console.log('sorted',{fcmToken: Md5.hashStr(salt + paramString), paramString: paramString} )
        var md5 = require('md5');
        return {token: md5.hashStr(salt + paramString), paramString: paramString};

    }


    public async submit(config: ApiSubmitInterface):Promise<ApiResponseInterface> {


        var httpHeaders = {
            "Accept": 'application/json',
        };

        // config.data['version'] = "alwaysAllow";

        ApiService.headers.forEach(current => {
            httpHeaders[current.key] = current.value

        });


        return  axios.request({

            method: config.method ?? "POST",
            url: config.url,
            params: config.param,
            data: config.data,
            headers: httpHeaders,

        })

    }
}


export interface ApiSubmitInterface {
    url: string;
    data: object;
    param?: object;
    isSilentLoader?: boolean;
    isSilentAllResponse?: boolean;
    isSilentErrorResponse?: boolean;
    isSilentSuccessResponse?: boolean;
    loaderMessage?: string;
    isWithoutHeader?: boolean;
    isParamJson?: boolean;
    isWithoutToken?: boolean;

    cancelMessage?: string;
    isCancelable?: boolean;
    delayAfterLoading?: number;

    onFinish?: (response: ApiResponseInterface) => void;
    onCatch?: (err) => void;
    method?: "GET" | "POST"
}


export interface ApiResponseInterface {

    isSuccess?: boolean;
    message: string;
    data: any;
}
