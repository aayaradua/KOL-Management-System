import mongoose from "mongoose";

const kolSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    socialMedia: [{
        platform: {
            type: String,
            required: true
        },
        account: {
            type: String,
            required: true
        },
        followers: {
            type: String,
            required: true
        }
    }
    ],
    postPrice: {
        type: Number,
        required: true
    },
    inviter: {
        type: String,
        required: true
    },
    isBlook: {
        type: Boolean,
        default: false
    },
    posts: [{
        post: {
            type:String
        }
    }],

}, { timestamps: true});

export const Kol = mongoose.model('Kol', kolSchema);