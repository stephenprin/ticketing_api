import express from 'express';  
import { Request, Response } from 'express';

import dotenv from 'dotenv';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import 'express-async-errors';
import cookieSession from 'cookie-session';

dotenv.config();

const app = express();
app.use(express.json());
app.set('trust proxy', true);


app.use(cookieSession({
    signed: false,
    secure:true
}))

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);


app.all('*', async(req, res, next) => {
    new NotFoundError()
})

app.use(errorHandler)




export { app };