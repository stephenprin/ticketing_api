import { CustomError } from './custom-error';

export class DatabaseValidationError extends CustomError { 
    reason = 'Error connecting to database';
    statusCode = 500;
    constructor() {
        super();
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseValidationError.prototype)
    }

    serializeErrors() { 
        return [
            { message: this.reason }
        ]
    }
}