import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jti: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['kol', 'admin', 'director', 'manager']
    },
    sessionId: {
        type: String,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
   
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true } );

export const Token = mongoose.model("Token", tokenSchema);