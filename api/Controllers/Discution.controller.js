import Discution from "../Models/Discution.model.js";
import Message from "../Models/Message.model.js";

export const createDiscution = async (req, res) => {
    const id = req.params.id;
    const {recieverId} = req.body;
    try {
        const disc = await Discution.findOne({participants: [id, recieverId]});
        if(disc){
            return res.status(400).json({message: "Discution already exists"});
        }
        const newDiscution = new Discution({
            participants: [id, recieverId]
        });
        await newDiscution.save();
        res.status(200).json({message: "Discution created successfully", discution: newDiscution});
    } catch (error) {
        console.log("Error in createDiscution: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
};


export const sentMessage = async (req, res) => {
    const {reciver, text } = req.body;
    const sender = req.params.id;
    try {
        const myDiscution = await Discution.findOne({participants: [sender, reciver]});
        if(!myDiscution){
            return res.status(400).json({message: "Discution not found"});
        }
        const newMessage = new Message({
            sender,
            reciver,
            text
        });
        myDiscution.messages.push(newMessage);
        await newMessage.save();
        await myDiscution.save();
        res.status(200).json({message: "Message sent successfully", message: newMessage});
        
    } catch (error) {
        console.log("Error in sentMessage: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export const getDiscution = async (req, res) => {
    const Userid = req.params.id;
    try {
        const discutions = await Discution.find({participants: Userid}).populate("messages");
        res.status(200).json({discutions});
    } catch (error) {
        console.log("Error in getDiscution: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
}