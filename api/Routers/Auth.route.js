import express from 'express';
import { deletAllUsers, login, logout, signup } from '../Controllers/Auth.controller.js';


const AuthRouter = express.Router();

AuthRouter.post('/signup',signup);
AuthRouter.post('/login',login);
AuthRouter.post('/logout',logout);
AuthRouter.post('/delete',deletAllUsers);

export default AuthRouter;