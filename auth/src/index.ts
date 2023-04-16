import mongoose from 'mongoose';
import { app } from './app';





const start = async () => { 
    if (!process.env.JWT_KEY) { 
        throw new Error('JWT_KEY must be defined');
    }
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