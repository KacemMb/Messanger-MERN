import express from 'express';
import { getFriend, getUserData, sendFriendRequest, updateProfileBio } from '../Controllers/Profile.controller.js';


const ProfileRouter = express.Router();

ProfileRouter.patch('/updatebio',updateProfileBio);
ProfileRouter.patch('/addfriend/:id',sendFriendRequest);
ProfileRouter.get('/getuser/:id',getUserData);
ProfileRouter.get('/friend/:id',getFriend)

export default ProfileRouter;