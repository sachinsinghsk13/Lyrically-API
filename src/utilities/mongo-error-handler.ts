import { Error } from "mongoose";
import CustomException from "./custom-error";

function handleMongoDBException(error: any) {
    switch(error.name) {
        case 'MongoError':
            if (error.code == 110000)
        
            break;
        case 'ValidationError':
            throw new CustomException((error as Error.ValidationError).message, 400, (error as Error.ValidationError).errors)
        default:
            throw new CustomException(error.message, 500,error.name);
    }
}

export default handleMongoDBException;