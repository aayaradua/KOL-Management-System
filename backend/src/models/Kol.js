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
    isBlocked: {
        type: Boolean,
        default: false
    },
    posts: [
        {
            postUrl: String,
            views: Number,
            likes: Number,
            shares: Number,
            comments: String,
            remarks: String
        }
    ],

}, { timestamps: true});

export const Kol = mongoose.model('Kol', kolSchema);