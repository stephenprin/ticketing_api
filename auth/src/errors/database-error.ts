import { ValidationError } from 'express-validator';

interface CustomError { 
    statusCode: number;
    serializeErrors(): {
        message: string,
        field?: string
    }[]
}

export class DatabaseValidationError extends Error implements CustomError { 
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