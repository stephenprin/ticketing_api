import express from 'express';  
import { Request, Response } from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/sigin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';


const app = express();
app.use(express.json());



app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(errorHandler)



app.listen(3000, () => { 
    console.log('Server started on port 3000!!!');
});