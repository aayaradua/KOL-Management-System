import { Manager } from '../models/Manager.js';

export const addManager = async(req, res) => {
    const { name, responsibleRegion, suggestedPrice, creator } = req.body;
    try {
        const manager = await Manager.create({
            name,
            responsibleRegion: [
                {
                    region: responsibleRegion,

                    suggestedPrice: suggestedPrice
                }
            ],
            creator
        });
        return res.status(201).json({
            status: 'Success',
            message: 'Manager has been created successfully',
            data: manager
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};

export const getAllManagers = async(req, res) => {
    try {
        const managers = await Manager.find().populate('creator', 'name');
        return res.status(200).json({
            status: 'Success',
            message: 'Manager has been created successfully',
            data: managers
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    };
};

export const viewManagerInfo = async(req, res) => {
    const  id = req.params.id
    try {
        const manager = await Manager.findById(id);
        if (!manager) {
            return res.status(404).json({error: 'Manager not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Manager info has been fetched successfully',
            data: manager
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'Failed',
            message: err.message
        });
    }
};

export const modifyManager = async(req, res) => {
    const  id = req.params.id;
    const { responsibleRegion, suggestedPrice } = req.body;
    const updatedData = { responsibleRegion, suggestedPrice }

    try {
        const manager = await Manager.findByIdAndUpdate(id, {updatedData}, {new: true});
        if (!manager) {
            return res.status(404).json({error: 'Manager not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Manager has been modified successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};

export const deleteManager = async(req, res) => {
    const id  = req.params.id;
    try {
        const manager = await Manager.findByIdAndDelete(id);
        if (!manager) {
            return res.status(404).json({error: 'Manager not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'Manager is deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};