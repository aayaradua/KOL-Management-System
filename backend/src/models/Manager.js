import mongoose from "mongoose";
import { User } from "./User.js";

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    responsibleRegion: [
        {
            region: {
                type: String,
                required: true
            },
            suggestedPrice: {
                type: Number,
                required: true
            }
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true});

export const Manager = mongoose.model('manager', managerSchema);