import Profil from '../Models/Profil.model.js';
import User from '../Models/Auth.model.js';

export const updateProfileBio = async (req, res) => {
    const { bio } = req.body;
    try {
        const findProfile = await Profil.findOne({user: req.userId});
        if(!findProfile){
            return res.status(400).json({message: "Profile not found"});
        }
        findProfile.bio = bio;
        await findProfile.save();
        res.status(200).json({message: "Profile updated successfully", profil: findProfile});
    } catch (error) {
        console.log("Error in updateProfile: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const sendFriendRequest = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.params.id;
    try {
        const findProfile = await Profil.findOne({user: userId});
        if(!findProfile){
            return res.status(400).json({message: "Profile not found"});
        }
        if(findProfile.friends.includes(friendId)){
            return res.status(400).json({message: "Friend already added"});
        }
        const findFriendProfile = await Profil.findOne({user: friendId});
        if(!findFriendProfile){
            return res.status(400).json({message: "Friend profile not found"});
        }
        findFriendProfile.friends.push(userId);
        findProfile.friends.push(friendId);
        await findFriendProfile.save();
        await findProfile.save();
        res.status(200).json({message: "Friend request sent successfully", profil: findProfile});
    } catch (error) {
        console.log("Error in sendFriendRequest: ", error);
        res.status(500).json({message: "Something went wrong"});
    }

}
export const getUserData = async (req, res) => {
    const id = req.params.id;
    try {
        const findUser = await User.findOne({_id: id}).select("-password");
        if(!findUser){
            return res.status(400).json({message: "User not found"});
        }
        const findProfile = await Profil.findOne({user: id});
        res.status(200).json({user: findUser, profil: findProfile});
    } catch (error) {
        console.log("Error in getUserData: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}


export const getManyUsers = async (req, res) => {
    const { ids } = req.body;
    try {
        const findUsers = await User.find({_id: {$in: ids}}).select("-password");
        if(!findUsers){
            return res.status(400).json({message: "Users not found"});
        }
        const findProfiles = await Profil.find({user: {$in: ids}});

        res.status(200).json({users: findUsers, profiles: findProfiles});
        
    } catch (error) {
        console.log("error in getManyUsers: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getFriend = async (req, res) => {
    const id = req.params.id;
    try {
        const findUser = await User.findOne({_id: id}).select("-password -email -createdAt -updatedAt -__v");
        
        if(!findUser){
            return res.status(400).json({message: "User not found ii" });
        }
        const findProfile = await Profil.findOne({user: id});
        const friend = {user: findUser, profil: findProfile};
        res.status(200).json({friend});
        
    } catch (error) {
        console.log("error errrrrrror ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}