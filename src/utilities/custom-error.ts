export class CustomError extends Error {
    constructor(message: string, public httpStatusCode: number, public response: any ) {
        super(message);
    }

    toString() : string {
        return `Message: ${this.message}, Http Status: ${this.httpStatusCode}`;
    }
}