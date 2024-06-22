import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.Routes.js'
import messageRoutes from './routes/message.Routes.js'
import userRoutes from './routes/user.Routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.get('/',(req, res) =>{
    res.send('hola');
});

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
});

