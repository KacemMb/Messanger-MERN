import mongoose from "mongoose";

const ProfilSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    },

}, {timestamps: true});

const Profil = mongoose.model('Profil', ProfilSchema);

export default Profil;