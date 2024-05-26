import mongoose from "mongoose";

const DiscutionSchema = new mongoose.Schema({
    participants: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    },
    
}, {timestamps: true});

const Discution = mongoose.model('Discution', DiscutionSchema);

export default Discution;