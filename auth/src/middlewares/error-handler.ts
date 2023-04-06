import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors/request-validation';
import { DatabaseValidationError } from '../errors/database-error';

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => { 
    if (err instanceof RequestValidationError) { 
       
        return res.status(err.statusCode).send({ errors: err.serializeErrors()})
    }
    if (err instanceof DatabaseValidationError) { 
        
        return res.status(500).send({ errors: err.serializeErrors() })
    }
        
    return res.status(500).send({
        errors: [{ message: 'Something went wrong' }]
    })
}