import { Request, Response, NextFunction } from "express";
import { NotAuthorizeError } from "../errors/not-authorize";

export const requestAuth = (req:Request, res:Response, next:NextFunction) => {
    if (!req.currentUser) {
        throw new  NotAuthorizeError()
    }
    next()
}