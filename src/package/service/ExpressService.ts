import {ValidationChain, validationResult} from "express-validator";
import express, {Express} from "express";
import {Singleton} from "../class/Singleton";
import {EnvService} from "./EnvService";
import {ConfigService} from "./ConfigService";

export class ExpressService extends Singleton<ExpressService>() {


    public appExpress: Express;
    public static headers:object = {};

    protected constructor() {
        super();

        this.setAppExpress();

    }

    private setAppExpress() {
        this.appExpress = express();
        this.appExpress.use(express.urlencoded());
        this.appExpress.use(express.json());
        this.appExpress.use((req,res,next)=>{

            console.log("express headers",ExpressService.headers)
            for(var key in ExpressService.headers){
                var value = ExpressService.headers[key];

                res.setHeader(key,value);
            }
            next();
        })
        //# env.EXPRESS_PORT
        //# config.default.port

        var port = EnvService.getInstance().get('EXPRESS_PORT') ?? ConfigService.getInstance().get("port");
        if (!port) {
            throw new Error("Port not defined in  config and env");
        }

        this.appExpress.listen(port, () => {
        })


    }

    public getValidationChain(validations: ValidationChain[]) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }

            // console.log(req.body)
            res.status(400).json({errors: errors.array()});
        };
    };


}
