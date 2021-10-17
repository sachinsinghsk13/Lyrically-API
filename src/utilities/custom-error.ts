class CustomException extends Error {
    constructor(message?: string, public httpStatusCode: number = 500,public errorData?: any) {
        super(message);
    }
}

export default CustomException;