import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { BadRequestError } from '../errors/bad-requestError';
import { RequestValidationError } from '../errors/request-validation';

import { User } from '../models/user-model';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
],
   async (req: Request, res: Response) => { 
 
        const error = validationResult(req)
        if (!error.isEmpty()) {
            throw new RequestValidationError(error.array())
        }
       
       const { email, password } = req.body
       
       const existingUser = await User.findOne({ email })
       if (existingUser) { 
            throw new BadRequestError('Email in use')
       }

       const user = User.build({ email, password })
       await user.save()

       //gENERATE JWT 
       const userJwt = jwt.sign({
           id: user.id,
              email: user.email
       }, process.env.JWT_KEY!)

       //store it on session object

       req.session = {
           jwt: userJwt
           
       }


       res.status(201).send(user)
    })

export { router as signupRouter }; 