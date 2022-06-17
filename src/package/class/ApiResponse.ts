class ApiResponse{


    message:string = "";
    isSuccess:boolean = true;

    data:object = {};

    public addData(data){
        this.data = Object.assign(data,this.data)
        return this;
    }



}