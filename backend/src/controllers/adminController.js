import { Admin } from '../models/Admin.js'
import { hashPassword } from '../utils/bcrypt.js';

export const addUser = async( req, res) => {
    const { username, role, email, password, status } =req.body;
    try {
        const existingUser =await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({error: 'User already exist'});
        }
        const hashedPassword = await hashPassword(password);
        const user = await Admin.create({
            username,
            role,
            email,
            password: hashedPassword,
            status
        });

        return res.status(201).json({
            status: 'Success',
            message: 'User has been created successfully',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};

export const getAllUsers = async(req, res) => {
    try {
        const users = await Admin.find();

        return res.status(200).json({
            status: 'Success',
            message: 'Users fetched successfully',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};

export const viewUserInfo = async(req, res) => {
    const  id = req.params.id
    try {
        const user = await Admin.findById(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'User info has been fetched successfully',
            data: user
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'Failed',
            message: err.message
        });
    }
};

export const deleteUser = async(req, res) => {
    const  id  = req.params.id;
    try {
        const user = await Admin.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'User has been deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};

export const modifyUser = async(req, res) => {
    const id = req.params.id;
    const { role, status } = req.body;
    const updatedData = { role, status };
    try {
        const user = await Admin.findByIdAndUpdate(id, updatedData, { new: true} );
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({
            status: 'Success',
            message: 'User has been modified successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed', 
            message: err.message
        });
    }
};