import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    jti: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    sessionId: {
        type: String,
        required: true, 
        unique: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
   
    token: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true } );

export const Token = mongoose.model("Token", tokenSchema);