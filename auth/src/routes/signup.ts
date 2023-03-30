import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/api/users/signup', (req:Request, res:Response) => { 
   res.send('Hi there!')
})

export { router as signupRouter }; 