import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    responsibleRegion: [
        {
            region: [String],
            suggestedPrice: [Number]
        }
    ]
}, { timestamps: true});

export const Manager = mongoose.model('manager', managerSchema);