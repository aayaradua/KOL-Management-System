import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'director', 'manager']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['enable', 'disable'],
        required: true
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date
    
}, { timestamps: true});

export const Admin = mongoose.model('admin', adminSchema);