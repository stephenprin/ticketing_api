import express from 'express';  
import { Request, Response } from 'express';
const app = express();
app.use(express.json());

app.get("/api/users/currentuser", (req:Request, res:Response) => {
    res.send("hello there")
})

app.listen(3000, () => { 
    console.log('Server started on port 3000!!!');
});