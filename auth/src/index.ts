import express from 'express';  
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/sigin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import 'express-async-errors';

dotenv.config();

const app = express();
app.use(express.json());



app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);


app.all('*', async(req, res, next) => {
    new NotFoundError()
})

app.use(errorHandler)

const start = async () => { 
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log('Connected to MongoDB!!!');
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => { 
        console.log('Server started on port 3000!!!');
    });
}

start();