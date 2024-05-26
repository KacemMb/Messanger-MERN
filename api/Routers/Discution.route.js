import express from 'express';
import { createDiscution, getDiscution, sentMessage } from '../Controllers/Discution.controller.js';

const DiscutionRouter = express.Router();

DiscutionRouter.post('/createDiscution/:id',createDiscution);
DiscutionRouter.post('/sentMessage/:id',sentMessage);
DiscutionRouter.get('/getDiscution/:id',getDiscution);

export default DiscutionRouter;