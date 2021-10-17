import { Response } from "express";
import CustomException from "./custom-error";

class CustomResponse {
    constructor(public message: string, public data: any) {}
}

class ResponseBuilder {
    public httpStatusCode: number = 200;
    public message: string;
    public data: any;
    public resourceCreated: boolean = false;
    public resourceLink: string;
    statusCode(httpStatusCode: number) {
        this.httpStatusCode = httpStatusCode;
        return this;
    }

    attachData(data: any) {
        this.data = data;
        return this;
    }

    setMessage(message: any) {
        this.message = message;
        return this;
    }

    fetched(resourceName?: string) {
        this.message = `${resourceName? resourceName : 'Data'} Fetch Successfully`;
        return this;
    }

    updated(resourceName?: string) {
        this.message = `${resourceName? resourceName : 'Data'} Updated Successfully`;
        return this;
    }

    deleted(resourceName?: string) {
        this.message = `${resourceName? resourceName : 'Data'} Deleted Successfully`;
        return this;
    }

    created(resourceURI?: string, resourceName?: string) {
        this.resourceCreated = true;
        this.message = `${resourceName? resourceName : 'Data'} Created Successfully`;
        this.httpStatusCode = 201;
        this.resourceLink = resourceURI;
        return this;
    }

    send(res: Response) {
        if (this.resourceCreated && this.resourceLink)
            res.links({href: this.resourceLink});
        res.status(this.httpStatusCode).json(new CustomResponse(this.message, this.data)).end();
    }
}

class API {
    static success() {
        return new ResponseBuilder();
    }

    static error(exception: Error) {
        const rb = new ResponseBuilder();
        if (exception instanceof CustomException) {
            rb.statusCode(exception.httpStatusCode).setMessage(exception.message).attachData(exception.errorData);
        } else {
            rb.statusCode(500).setMessage(exception.message)
        }
        return rb;
    }
}
export default API;