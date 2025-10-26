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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    blockedReason: String,
    blockedDate: Date,
    posts: [
        {
            postUrl: String,
            views: Number,
            likes: Number,
            shares: Number,
            comments: String,
            remarks: String
        }
    ]
}, { timestamps: true});

export const Kol = mongoose.model('kol', kolSchema);