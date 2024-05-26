import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/Connection.js';
import AuthRouter from './Routers/Auth.route.js';
import ProfileRouter from './Routers/Profile.route.js';
import DiscutionRouter from './Routers/Discution.route.js';
import cors from 'cors';

console.clear();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/auth',AuthRouter);
app.use('/api/profile',ProfileRouter);
app.use('/api/discution',DiscutionRouter);

//http://localhost:4060/api/profile/friend

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/`);
    connectDB();
});