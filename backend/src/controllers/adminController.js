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
            message: 'User has been created successfully'
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

        const cleanUsers = users.map(user => ({
            username: user.username,
            role: user.role,
            status: user.status  
        }));

        return res.status(200).json({
            status: 'Success',
            message: 'Users fetched successfully',
            users: cleanUsers  
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
            username: user.username,
            role: user.role,
            email: user.email,
            status: user.status  
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