import mongoose from "mongoose";
import { Admin } from "./Admin.js";

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regions: [
        {
            responsibleRegion: {
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
        ref: 'admin'
    }

}, { timestamps: true});

export const Manager = mongoose.model('manager', managerSchema);