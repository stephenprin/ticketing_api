import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-requestError";
import { RequestValidationError } from "../errors/request-validation";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user-model";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/api/users/signin", [
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("You must supply a password")
],
validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
  

    const existingUser = await User.findOne({ email })
    


    if (!existingUser) { 
         throw new BadRequestError('invalid credentials')
    }

    const comparePasswords = await Password.compare(existingUser.password, password)
    if (!comparePasswords) { 
        throw new BadRequestError('invalid credentials')
    }
    const userJwt = jwt.sign({
      id: existingUser.id,
         email: existingUser.email
  }, process.env.JWT_KEY!)

    req.session = {
      jwt: userJwt
      
    }
    res.status(200).send(existingUser)
  

});


export { router as signinRouter };
