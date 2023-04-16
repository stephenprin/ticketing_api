import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { requestAuth } from '../middlewares/requestAuth';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, requestAuth , (req: Request, res: Response) => { 
  
      res.send({
         currentUser: req.currentUser || null
      })
})

export { router as currentUserRouter }; 