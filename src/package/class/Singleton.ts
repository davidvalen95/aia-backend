
export function Singleton<T>() {
     class Singleton{



        private static instance:T;

        public static getInstance():T{

            if(!this.instance){
                this.instance = <T> new this;
            }
            return this.instance;
        }
    }
    return Singleton;
}