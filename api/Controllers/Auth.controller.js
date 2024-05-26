import User from "../Models/Auth.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSerCookies from "../Utils/TokenGenerator.js";
import Profil from "../Models/Profil.model.js";

export const signup = async (req, res) => {
    const { firstname, lastname, email , password, gender } = req.body;
    try {
        const hachedPassword = await bcrypt.hash(password, 11);
        const findUserbyEmail = await User.findOne({email});
        if(findUserbyEmail){
            return res.status(400).json({message: "User already exist"});
        }
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hachedPassword,
            gender});
        const token = generateTokenAndSerCookies(newUser._id, res);
        let PDP;
        if(req.body.gender == 'male'){
            PDP = `https://avatar.iran.liara.run/public/boy?username=${firstname}`;
        }else{
            PDP = `https://avatar.iran.liara.run/public/girl?username=${firstname}`;
        }
        const newProfile = new Profil({
            user: newUser._id,
            bio: "hi there! I'm new here!",
            profilePhoto : PDP,
            friends: []
        });
        await newProfile.save();
        await newUser.save();
        console.log("profile created successfully")
        res.status(201).json({message: "User created successfully", user: newUser,token, profile: newProfile});
        
    } catch (error) {
        console.log("Error in signup: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUserbyEmail = await User.findOne({email});
        if(!findUserbyEmail){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isPasswordMatch = await bcrypt.compare(password, findUserbyEmail.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = generateTokenAndSerCookies(findUserbyEmail._id, res);
        res.status(200).json({message: "Login successfully", token});
    }
    catch (error) {
        console.log("Error in login: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.log('Error in logout: ', error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const deletAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        await Profil.deleteMany();
        res.status(200).json({message: "All users deleted successfully"});
    } catch (error) {
        console.log("Error in deletAllUsers: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}
