import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await admin.comparePassword(password))) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
            res.json({
                _id: admin._id,
                email: admin.email,
                token
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
